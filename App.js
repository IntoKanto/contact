import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';

export default function App() {
  const [contact, setContact] = useState({})

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync()
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      )
      if (data.length > 0) {
        setContact(data)
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.list}>
      <FlatList 
      data={ contact }
      renderItem= {({item }) => 
    <Text>{item.name}  -  {item.phoneNumbers[0].number} </Text>}
      />
      
      <Button style={styles.button}
      title='Get Contacts'
      onPress={getContacts}/>
      <StatusBar style="auto" />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 50,
    marginBottom: 30,
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
 
});
