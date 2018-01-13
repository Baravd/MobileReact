import React, {Component} from "react";
import {View, Text, FlatList, AsyncStorage, ListView, TouchableOpacity, Button} from "react-native";



export default class ExpenseList extends React.Component {
    constructor() {
        super();
        this.state = {ds: global.ds.cloneWithRows([])};
        this.user = global.firebaseApp.auth().currentUser;

        console.log("Home user=" + JSON.stringify(this.user));
        this.ref = global.firebaseApp.database().ref().child('users').child(this.user.uid).child('expenses');
        console.log("DB ref="+JSON.stringify(this.ref));

        this.updateState()
    }

    _keyExtractor = (item, index) => item.id;

    updateState() {

        console.log("refresh list");
        this.ref.on('value', (snap) => {
            let expenses = [];
            snap.forEach(element => {
                expenses.push(element.val())
            });
            console.log("Expenser-uri="+JSON.stringify(expenses));
            this.setState({ds: global.ds.cloneWithRows(expenses)});
        })

       /* AsyncStorage.getAllKeys().then((keys) => {
            let expenses = [];
            for (let keyIndex in keys) {
                AsyncStorage.getItem(keys[keyIndex]).then((value) => {
                    expenses.push(JSON.parse(value));
                    this.setState({ds: global.ds.cloneWithRows(expenses)});
                })
            }

        });*/

    }

    renderRow(record) {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', {
                    expense: record,
                    uid: this.user.uid,
                    updateState: this.updateState.bind(this)
                })}>
                    <View style={{flexDirection: 'row', padding: 10}}>
                        <View stle={{flex: 1}}>
                            <Text>{record.nume}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{textAlign: 'right'}}>{record.type}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }


    render() {

        return (
            <View>
                <ListView
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
                />

                <Button title="Add Expense"
                        onPress={() => this.props.navigation.navigate('AddExpenseView',{
                            updateState: this.updateState.bind(this)
                        })}
                />


            </View>
        )
            ;
    }


}
