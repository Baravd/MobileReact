import * as React from "react";
import {View, Button} from "react-native";

export default class Home extends React.Component {
    constructor(props) {
        super();
        this.auth = global.firebaseApp.auth();
        this.state = {userId: ""};
        this.user = global.firebaseApp.auth().currentUser;
        console.log("Home user=" + JSON.stringify(this.user));
        global.uid = this.user.uid;
        this.ref = global.firebaseApp.database().ref().child('users').child(global.uid).child('premium');
        this.isPremium = true;
        this.ref.on('value', (snapshot) => {
            this.isPremium = snapshot.val();
        });
       /* const messaging = global.firebaseApp.messaging();
        messaging.requestPermission()
            .then(function() {
                console.log('Notification permission granted.');
                // ...
            })
            .catch(function(err) {
                console.log('Unable to get permission to notify.', err);
            });*/
        console.log("ISpremium=" + this.isPremium);
        /*this.auth.onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                let email = user.email;
                let uid = user.uid;
                this.uid = uid;
                console.log("this uid=", this.uid);
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });*/

    }

    render() {
        const {navigate} = this.props.navigation;
        return <View>
            <Button
                title={"Show all expenses"}
                onPress={() => navigate('List')}
            />
            <Button
                title={"Statistics"}
                onPress={() => navigate('Statistics')}
                disabled={this.isPremium}            />
            <Button
                title={"Email Us"}
                onPress={() => navigate('Mail')}

            />
            <Button title="LOG OUT" onPress={() => {
                this.auth.signOut()
                this.props.navigation.goBack();
            }}/>
        </View>
    }

}