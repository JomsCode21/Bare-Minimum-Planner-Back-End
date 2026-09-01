import webpush from "web-push";
import { TaskModel } from "@/models/task.models";
import { UserModel, type IPushSubscription } from "@/models/user.model";

const REMINDER_LEAD_TIME_MS = 15 * 60 * 1000;

const isPushConfigured = () => {
  const { VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;

  if (!VAPID_SUBJECT || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return false;
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  return true;
};

const sendPush = async (subscription: IPushSubscription, taskTitle: string) =>
  webpush.sendNotification(
    subscription,
    JSON.stringify({
      title: "Bare Minimum Planner",
      body: `"${taskTitle}" is due in less than 15 minutes.`,
      url: "/dashboard",
    }),
  );

export const sendDueTaskReminders = async () => {
  if (!isPushConfigured()) return;

  const now = new Date();
  const reminderWindowEnd = new Date(now.getTime() + REMINDER_LEAD_TIME_MS);
  const tasks = await TaskModel.find({
    dueAt: { $gt: now, $lte: reminderWindowEnd },
    isCompleted: false,
    pushReminderSentAt: null,
  });

  for (const task of tasks) {
    const user = await UserModel.findById(task.user);
    if (!user?.pushSubscriptions.length) continue;

    let wasDelivered = false;
    const expiredEndpoints: string[] = [];

    for (const subscription of user.pushSubscriptions) {
      try {
        await sendPush(subscription, task.title);
        wasDelivered = true;
      } catch (error: unknown) {
        const statusCode =
          typeof error === "object" && error && "statusCode" in error
            ? Number(error.statusCode)
            : 0;

        if (statusCode === 404 || statusCode === 410) {
          expiredEndpoints.push(subscription.endpoint);
        }
      }
    }

    if (expiredEndpoints.length) {
      user.pushSubscriptions = user.pushSubscriptions.filter(
        (subscription) => !expiredEndpoints.includes(subscription.endpoint),
      );
      await user.save();
    }

    if (wasDelivered) {
      task.pushReminderSentAt = new Date();
      await task.save();
    }
  }
};

export const startPushReminderScheduler = () => {
  if (!isPushConfigured()) {
    console.warn("Push reminders are disabled: VAPID settings are missing.");
    return;
  }

  void sendDueTaskReminders().catch((error) =>
    console.error("Push reminder check failed:", error),
  );
  setInterval(() => {
    void sendDueTaskReminders().catch((error) =>
      console.error("Push reminder check failed:", error),
    );
  }, 60_000);
};
