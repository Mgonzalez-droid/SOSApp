import React, { useState } from "react";
import { 
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";

// Placeholder functions for health data and emergency call
const fetchHealthData = async () => {
    // Replace with actual Apple HealthKit / Google Fit integration
    return {
        heartRate: 72,
        medicalID: {
            medications: ["Aspirin"],
            disabilities: ["None"],
        },
    };
};

const callEmergencyServices = () => {
    // Replace with actual phone call logic (Linking.openURL('tel:911'))
    Alert.alert("Calling Emergency Services...");
};

type Contact = {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
};

const SettingsPanel: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [healthData, setHealthData] = useState<any>(null);
    const [showHealthData, setShowHealthData] = useState(false);

    const addContact = () => {
        if (!firstName || !lastName || !phone) return;
        setContacts([
            ...contacts,
            { id: Date.now().toString(), firstName, lastName, phone },
        ]);
        setFirstName("");
        setLastName("");
        setPhone("");
    };

    const removeContact = (id: string) => {
        setContacts(contacts.filter((c) => c.id !== id));
    };

    const handleFetchHealthData = async () => {
        if (!showHealthData) {
            const data = await fetchHealthData();
            setHealthData(data);
            setShowHealthData(true);
        } else {
            setShowHealthData(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Ad Banner Area */}
            <View style={styles.adBanner}>
                {/* Replace this with your ad component, e.g., AdMobBanner */}
                <Text style={styles.adText}>Ad Banner Placeholder</Text>
            </View>

            <Text style={styles.header}>Settings Panel</Text>

            {/* Emergency Contacts */}
            <Text style={styles.sectionHeader}>Emergency Contacts</Text>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <Button title="Add" onPress={addContact} />
            </View>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.contactRow}>
                        <Text>{item.firstName} {item.lastName} - {formatPhoneNumber(item.phone)}</Text>
                        <TouchableOpacity onPress={() => removeContact(item.id)}>
                            <Text style={styles.remove}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No contacts added.</Text>}
            />

            {/* Health Data */}
            <Text style={styles.sectionHeader}>Health Data</Text>
            <Button title={showHealthData ? "Hide Health Data" : "Fetch Health Data"} onPress={handleFetchHealthData} />
            {showHealthData && healthData && (
                <View style={styles.healthData}>
                    <Text>Heart Rate: {healthData.heartRate} bpm</Text>
                    <Text>Medications: {healthData.medicalID.medications.join(", ")}</Text>
                    <Text>Disabilities: {healthData.medicalID.disabilities.join(", ")}</Text>
                </View>
            )}

            {/* Emergency Call */}
            <Text style={styles.sectionHeader}>Emergency Services</Text>
            <Button title="Call Emergency Services" color="red" onPress={callEmergencyServices} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, backgroundColor: "#fff" },
    adBanner: { height: 60, justifyContent: "center", alignItems: "center", backgroundColor: "#f1f1f1", marginBottom: 16, borderRadius: 8 },
    adText: { color: "#888", fontSize: 16 },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    sectionHeader: { fontSize: 18, fontWeight: "600", marginTop: 20, marginBottom: 10 },
    inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginRight: 8, flex: 1 },
    contactRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
    remove: { color: "red", marginLeft: 10 },
    empty: { color: "#888", fontStyle: "italic" },
    healthData: { marginTop: 10, backgroundColor: "#f9f9f9", padding: 10, borderRadius: 5 },
});

const formatPhoneNumber = (phone: string) => {
    // Simple US phone number formatting
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
};

export default SettingsPanel;