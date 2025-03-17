import { 
  View, Text, TextInput, Button, StyleSheet, TouchableOpacity, 
  ScrollView, KeyboardAvoidingView, Platform 
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../configuration"; // Firestore instance
import { scheduleMedicationAlarm } from "../../components/resusables/ScheduleMedication"; // Import function

export default function MedicationForm({ onClose }) {
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [repeat, setRepeat] = useState("daily");
  const [repeatDays, setRepeatDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Store selected date
  const [selectedTime, setSelectedTime] = useState(new Date()); // Store selected time
  const [notes, setNotes] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Handle Date Selection
  const handleDateChange = (event, date) => {
    if (date) setSelectedDate(date);
    setShowDatePicker(false);
  };

  // Handle Time Selection
  const handleTimeChange = (event, time) => {
    if (time) setSelectedTime(time);
    setShowTimePicker(false);
  };

  // Toggle repeat day selection
  const toggleRepeatDay = (day) => {
    setRepeatDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  // Save data to Firestore and schedule an alarm
  const saveMedication = async () => {
    try {
      // Merge the selected date & time into one Date object
      const intakeDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        selectedTime.getHours(),
        selectedTime.getMinutes()
      );

      // Save to Firestore
      const docRef = await addDoc(collection(db, "Medications"), {
        medicationName,
        dosage,
        repeat,
        repeatDays,
        intakeTime: intakeDateTime,
        notes,
        isTaken: false,
        status: "pending",
        createdAt: new Date(),
      });

      // Schedule a notification for the medication
      await scheduleMedicationAlarm(medicationName, intakeDateTime);

      alert("Medication added and alarm set!");
      onClose(); // Close form after submission
    } catch (error) {
      console.error("Error saving medication:", error);
      alert("Failed to add medication.");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Medication Name</Text>
          <TextInput style={styles.input} value={medicationName} onChangeText={setMedicationName} />

          <Text style={styles.label}>Dosage</Text>
          <TextInput style={styles.input} value={dosage} onChangeText={setDosage} />

          <Text style={styles.label}>Repeat</Text>
          <TextInput style={styles.input} value={repeat} onChangeText={setRepeat} />

          {/* Date Selection */}
          <Text style={styles.label}>Select Date</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>📅 {selectedDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker 
              value={selectedDate} 
              mode="date" 
              display="default" 
              onChange={handleDateChange} 
            />
          )}

          {/* Time Selection */}
          <Text style={styles.label}>Select Time</Text>
          <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
            <Text style={styles.timeText}>⏰ {selectedTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker 
              value={selectedTime} 
              mode="time" 
              display="default" 
              onChange={handleTimeChange} 
            />
          )}

          <Text style={styles.label}>Repeat Days</Text>
          <View style={styles.daysContainer}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayButton, repeatDays.includes(day) && styles.selectedDay]}
                onPress={() => toggleRepeatDay(day)}
              >
                <Text style={[styles.dayText, repeatDays.includes(day) && styles.selectedDayText]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Notes</Text>
          <TextInput style={styles.input} value={notes} onChangeText={setNotes} multiline />

          <Button title="Save Medication" onPress={saveMedication} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20, // Prevents last element from being cut off
  },
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 20,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  dateButton: {
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#007BFF",
  },
  timeButton: {
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
    backgroundColor: "#e3f2fd",
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    color: "#007BFF",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  dayButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedDay: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  dayText: {
    color: "black",
  },
  selectedDayText: {
    color: "white",
  },
});


