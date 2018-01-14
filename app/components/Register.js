import React, {Component} from "react";
import {Button, CheckBox, TextInput, View} from "react-native";

export class Register extends Component {
    constructor(props) {
        super();
        this.auth = firebaseApp.auth();;
        this.state={premium:false}
        this.ref = global.firebaseApp.database().ref().child('users');
    }

    render() {
        return <View>
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.email}
            />
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({password})}
                value={this.state.password}
            />
            <CheckBox
                title:"Premium"
                checked:{this.setState({premium:true})}
            />
            <Button title="Register" onPress={() => {
                console.log("Register");
                this.auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });
                this.ref.child(this.auth.currentUser).val(this.state.premium);
                this.props.navigation.navigate('Home');
            }
            }
            />
            }
        }


