/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SQLite from 'react-native-sqlite-storage';

const App = () => {

  const [items, setitems] = useState([]);

  useEffect(() => {
    const database = SQLite.openDatabase({
      name: "sqldb.db",
      location: 'default',
      createFromLocation: "~www/sqldb.db"
  },()=>{
    console.log(database);

    database.transaction((transaction)=>{
      transaction.executeSql('SELECT * from Catalogue',[],(transaction, result)=>{
        console.log(result);

        data = result.rows;

        for(let i=0; i < data.length; i++){
          items.push({...data.item(i)});
        }

        console.log(items);
        database.close();
      })
    })

  }, error=>{console.log(error)});

    

  return () => {

    };
  }, [SQLite, console]);


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic">
          <Header />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
export default App;
