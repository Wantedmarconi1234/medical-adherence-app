import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

export default function CalendarScreen() {
  // Get today's date in "YYYY-MM-DD" format
  const today = new Date().toISOString().split("T")[0];

  // Store the selected date and modal visibility state
  const [selectedDate, setSelectedDate] = useState(today);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <View style={styles.container}>
      {/* Selected Date and Icon */}
      <View style={styles.header}>
        <Text style={styles.selectedDate}>📅 {selectedDate}</Text>
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Ionicons name="calendar-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* Modal for Calendar */}
      <Modal visible={showCalendar} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
            <Calendar
              current={today}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "blue" },
              }}
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setShowCalendar(false); // Hide calendar after selection
              }}
            />
            <TouchableOpacity
              onPress={() => setShowCalendar(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  calendarWrapper: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
