import React, {Component} from "react";

import {TextInput, View, StyleSheet, AsyncStorage, Button, Text} from "react-native";

import DatePicker from "react-native-datepicker";

export default class ExpenseDetail extends Component {
    constructor(props) {
        super();
        //this.currentExpense = this.props.navigation.state.params.expense;
        this.ref = global.firebaseApp.database().ref().child('users').child(global.uid).child('expenses');//.child(JSON.stringify(this.currentExpense.id));
    }

    render() {
        const currentItem = this.props.navigation.state.params.expense;
        this.state = {id: currentItem.id, nume: currentItem.nume, type: currentItem.type, date: currentItem.date};

        return <View>
            <TextInput
                style={styles.row}
                editable={true}

                onChangeText={(text) => this.setState({id: text})}
                value={this.state.id}

            />
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({nume: text})}
                value={this.state.text}
            />
            <TextInput
                style={styles.row}
                editable={true}

                onChangeText={(text) => this.setState({type: text})}
                value={this.state.type}

            />
            <DatePicker date={this.state.date}
                        mode="date"
                        placeholder="purchase date"
                        onDateChange={(date) => {
                            this.setState({date: date})
                        }}

            />
            <Button
                title={"Save Changes"}
                onPress={() => {
                    this.ref.child(currentItem.id).set({
                        id: currentItem.id,
                        nume: this.state.nume,
                        type: this.state.type,

                    }).then(() => {
                        this.props.navigation.state.params.updateState();
                        this.props.navigation.goBack();
                    });
                    /*AsyncStorage.mergeItem(this.props.navigation.state.params.expense.id, JSON.stringify({
                            nume: this.state.nume,
                            type: this.state.type,
                            date: this.state.date
                        })
                    ).then(() => {
                        this.props.navigation.state.params.updateState();
                        this.props.navigation.goBack();
                    })*/
                }
                }

            />
            <Button
                title={"Delete"}
                onPress={() => {
                    console.log("CurrentID=" + currentItem.id);
                    this.ref.child(currentItem.id).remove().then(() => {
                        this.props.navigation.state.params.updateState();
                        this.props.navigation.goBack();
                    });
                    /* AsyncStorage.removeItem(this.props.navigation.state.params.expense.id)
                         .then(() => {
                             this.props.navigation.state.params.updateState();
                             this.props.navigation.goBack();
                         })*/
                }}

            />

        </View>
    }


}
const styles = StyleSheet.create({
    row: {
        marginBottom: 5,
        marginTop: 20,
        borderColor: '#E1B700'
    }
});