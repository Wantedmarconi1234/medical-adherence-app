import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons"; // Import Icons
import { deleteDoc, doc } from "firebase/firestore"; // Import Firestore delete functions
import { db } from "../../configuration"; // Firestore instance
import FetchDataHelper from "../../components/firebase/FetchDataHelper"; // Import function
import FlatListComponent from "../../components/resusables/FlatListComponent";

export default function MedicationLists() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null); // Track selected medication

  useEffect(() => {
    const unsubscribe = FetchDataHelper((data) => {
      setMedications(data);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener when unmounted
  }, []);

  // Function to check if it's time for medication
  const isMedicationTime = (intakeTime) => {
    const now = new Date();
    const medicationTime = new Date(intakeTime.seconds * 1000);
    return now.getHours() === medicationTime.getHours() && now.getMinutes() === medicationTime.getMinutes();
  };

  // Function to delete a medication from Firestore
  const deleteMedication = async (id) => {
    Alert.alert(
      "Delete Medication",
      "Are you sure you want to delete this medication?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "Medications", id));
              setMedications((prev) => prev.filter((med) => med.id !== id)); // Remove from UI
              alert("Medication deleted successfully!");
            } catch (error) {
              console.error("Error deleting medication:", error);
              alert("Failed to delete medication.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  // Function to render each medication item
  const renderItem = ({ item }) => {
    const isSelected = selectedId === item.id; // Track selected item for notes visibility
    const isTimeForMedication = isMedicationTime(item.intakeTime); // Check if it's time

    return (
      <TouchableOpacity 
        style={[styles.card, item.isTaken ? styles.taken : styles.pending]} 
        onPress={() => setSelectedId(isSelected ? null : item.id)} // Toggle selection
      >
        <View style={styles.cardHeader}>
          {/* Medication Name */}
          <Text style={styles.title}>{item.medicationName}</Text>

          {/* Icons Section */}
          <View style={styles.icons}>
            {/* Notification Bell - Changes to Yellow when it's time */}
            <Ionicons 
              name="notifications" 
              size={24} 
              color={isTimeForMedication ? "yellow" : "gray"} 
            />

            {/* Delete Button - Reduced size */}
            <TouchableOpacity onPress={() => deleteMedication(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={20} color="white" />
            </TouchableOpacity>

            {/* Expand/Collapse Notes Icon */}
            <Ionicons 
              name={isSelected ? "chevron-up-outline" : "chevron-down-outline"} 
              size={24} 
              color="#555" 
            />
          </View>
        </View>

        {/* Medication Details */}
        <Text style={styles.text}>💊 Dosage: {item.dosage}</Text>
        <Text style={styles.text}>⏰ Time: {new Date(item.intakeTime.seconds * 1000).toLocaleTimeString()}</Text>
        <Text style={styles.text}>🔄 Frequency: {item.repeat} ({item.repeatDays.join(", ")})</Text>

        {/* Notes Section (Visible when tapped) */}
        {isSelected && <Text style={styles.notes}>📝 {item.notes}</Text>}
      </TouchableOpacity>
    );
  };

  // Show loading indicator while data is being fetched
  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <FlatListComponent 
      data={medications}
      renderItem={renderItem}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // For Android shadow
  },
  taken: {
    backgroundColor: "#d4edda", // Light green for taken medications
    borderLeftWidth: 5,
    borderLeftColor: "#28a745",
  },
  pending: {
    backgroundColor: "#f8d7da", // Light red for pending medications
    borderLeftWidth: 5,
    borderLeftColor: "#dc3545",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15, // More space between icons
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 6,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  notes: {
    fontSize: 14,
    color: "#007BFF",
    fontStyle: "italic",
    marginTop: 5,
    backgroundColor: "#e3f2fd", // Light blue background for notes
    padding: 8,
    borderRadius: 5,
  },
});
