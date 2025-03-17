import { StyleSheet,StatusBar, ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CalendarScreen from "../../components/CalendarScreen";
import MedicationLists from "../../components/Lists/MedicationLists"

export default function Home() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.profileContainer}>
        <View style={styles.subProfileContainer}>
          {/* profile image */}
          <Image 
            source={require("../../assets/images/love-1020869_1280.jpg")}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          {/* greetings and name */}
          <View style={styles.sideTextContainer}>
            <Text>Good Morning</Text>
            <Text>John Doe</Text>
          </View>
        </View>

        {/* //reminder icon and button */}
        <View style={styles.subProfileContainer}>
          <TouchableOpacity onPress={() => alert("Notifications Clicked!")}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Settings Clicked!")}>
            <Ionicons name="settings-outline" size={24} color="black" style={{marginHorizontal: 5}}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <CalendarScreen />
      </View>
      <View style={styles.reminderContainer}>
        <MedicationLists />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the ScrollView takes full height
    backgroundColor: "#fff",
    padding: 20,
  },
  profileContainer: {
    minHeight: 80, // Instead of percentage height
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subProfileContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  sideTextContainer: {
    marginLeft: 10,
  },
  dateContainer: {
    minHeight: 80, 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reminderContainer: {
    minHeight: 350, 
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 10,
    // backgroundColor: "blue",
    padding: 10,
  },
});
