import * as Notifications from "expo-notifications";
import * as FileSystem from "expo-file-system";

export async function scheduleMedicationAlarm(medicationName, intakeTime) {
  const medicationDate = new Date(intakeTime.seconds * 1000);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Medication Reminder",
      body: `Time to take ${medicationName}!`,
      sound: FileSystem.documentDirectory + "alarm.wav", // Play custom sound
    },
    trigger: { date: medicationDate },
  });

  alert(`Alarm set for ${medicationName} at ${medicationDate.toLocaleTimeString()}`);
}
