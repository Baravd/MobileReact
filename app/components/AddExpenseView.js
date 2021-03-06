import React, {Component} from "react";
import {TextInput, View, StyleSheet, Button, AsyncStorage} from "react-native";
import DatePicker from "react-native-datepicker";


export class AddExpenseView extends Component {
    constructor(props) {
        super(props);
        this.state = {nume: "Name", type: "Type", date: new Date(), id: '-1'};
        this.uid = global.uid;//this.props.navigation.state.params.uid; /*global.firebaseApp.auth().currentUser;*/
        console.log("Add Expense User id="+JSON.stringify(this.uid));
        this.ref = global.firebaseApp.database().ref().child('users').child(this.uid).child('expenses');

    }

    render() {

        return (<View>
            <TextInput
                style={styles.row}
                editable={true}
                keyboardType='numeric'

                onChangeText={(text) => this.setState({id: text})}
                value={this.state.id}
                maxLength={10}

            />
            <TextInput
                style={styles.row}
                editable={true}

                onChangeText={(text) => this.setState({nume: text})}
                value={this.state.nume}

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
                title={"Save"}
                onPress={() => {
                    console.log(this.state.id, this.state.nume, this.state.type, this.state.date);
                    this.ref.child(this.state.id).set({
                        id: this.state.id,
                        nume: this.state.nume,
                        type: this.state.type,
                        date: this.state.date,
                    }).then(() => {
                        this.props.navigation.state.params.updateState();
                        this.props.navigation.goBack();
                    });

                    /* AsyncStorage.setItem(this.state.id, JSON.stringify({
                         id: this.state.id,
                         nume: this.state.nume,
                         type: this.state.type,
                         date: this.state.date
                     })).then(() => {
                         console.log("Add worked");
                         this.props.navigation.state.params.updateState();
                         console.log("It worked")
                         this.props.navigation.goBack();
                     });*/

                }}


            />

        </View>)
    }
}

const styles = StyleSheet.create({
    row: {
        marginBottom: 5,
        marginTop: 20,
        borderColor: '#E1B700'
    }
});
