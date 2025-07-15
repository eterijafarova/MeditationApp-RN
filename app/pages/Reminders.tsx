import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, Pressable, View } from "react-native";

const RemindersScreen = () => {
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [amPm, setAmPm] = useState("AM");
  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    new Array(7).fill(false)
  );

  const router = useRouter();

  useEffect(() => {
    const loadReminders = async () => {
      const time = await AsyncStorage.getItem("reminderTime");
      const days = JSON.parse(
        (await AsyncStorage.getItem("reminderDays")) || "[]"
      );

      if (time) {
        const [timePart, period] = time.split(" ");
        const [h, m] = timePart.split(":");
        setHour(h);
        setMinute(m);
        setAmPm(period);
      }

      if (Array.isArray(days)) {
        setSelectedDays(days);
      }
    };

    loadReminders();
  }, []);

  const handleDayToggle = (index: number) => {
    const updatedDays = [...selectedDays];
    updatedDays[index] = !updatedDays[index];
    setSelectedDays(updatedDays);
  };

  const handleContinue = async () => {
    const formattedTime = `${hour.padStart(2, "0")}:${minute.padStart(
      2,
      "0"
    )} ${amPm}`;

    await AsyncStorage.setItem("reminderTime", formattedTime);
    await AsyncStorage.setItem("reminderDays", JSON.stringify(selectedDays));

    router.replace("/(tabs)/Home");
  };

  const handleNoThanks = () => {
    router.replace("/(tabs)/Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What time would you like to meditate?</Text>

      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          value={hour}
          onChangeText={setHour}
          keyboardType="numeric"
          maxLength={2}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.timeInput}
          value={minute}
          onChangeText={setMinute}
          keyboardType="numeric"
          maxLength={2}
        />
        <Pressable
          style={styles.amPmToggle}
          onPress={() => setAmPm(amPm === "AM" ? "PM" : "AM")}
        >
          <Text style={styles.amPmText}>{amPm}</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>Which days would you like to meditate?</Text>

      <View style={styles.dayButtons}>
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <Pressable
            key={index}
            style={[
              styles.dayButton,
              selectedDays[index] ? styles.selectedDayButton : null,
            ]}
            onPress={() => handleDayToggle(index)}
          >
            <Text style={styles.dayButtonText}>{day}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handleContinue}>
        <Text style={styles.saveButtonText}>CONTINUE</Text>
      </Pressable>

      <Pressable style={styles.noThanksButton} onPress={handleNoThanks}>
        <Text style={styles.noThanksButtonText}>NO THANKS</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#3F414E",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  timeInput: {
    height: 50,
    width: 60,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    fontSize: 20,
    marginHorizontal: 5,
    backgroundColor: "#fff",
  },
  colon: {
    fontSize: 20,
    color: "#333",
  },
  amPmToggle: {
    marginLeft: 10,
    backgroundColor: "#A1A4B2",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  amPmText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  dayButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "80%",
    marginVertical: 20,
  },
  dayButton: {
    backgroundColor: "#A1A4B2",
    padding: 12,
    margin: 5,
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDayButton: {
    backgroundColor: "#3F414E",
  },
  dayButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#8E97FD",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  noThanksButton: {
    backgroundColor: "#DDDDDD",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
  },
  noThanksButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default RemindersScreen;
