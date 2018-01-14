import React, {Component} from "react";
import {Button, TextInput, View} from "react-native";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: 'test10@gmail.com', password: 'test10', uid: ''};


        console.log("Fire App=" + global.firebaseApp);

    }


    render() {
        const {navigate} = this.props.navigation;
        console.log(navigate);
        return (
            <View>
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
                <Button title="LOG IN" onPress={() => {
                    console.log("LoGIn");
                    //global.firebaseApp.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(this.navigation.navigate('Home'));
                    global.firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(navigate('Home'));

                }
                }
                />
                <Button title="SIGN UP" onPress={() => {
                    this.props.navigation.navigate('Register');
                }
                }
                />
            </View>
        );
    }

}