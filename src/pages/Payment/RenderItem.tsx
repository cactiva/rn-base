import { Text, Screen, Button, View, TopBar, Container, formatMoney } from "@src/libs";
import React from "react";
import logout from "@src/services/logout";
import { observer, useObservable } from "mobx-react-lite";
import { Dimensions, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import theme from "@src/theme";

export default observer(({ item, method }: any) => {
    const dim = Dimensions.get("window");
    const nav = useNavigation();
    const route = useRoute();
    const meta = useObservable({});

    return (
        <Button
            mode={"outlined"}
            style={{
                width: "47%"
            }}
            onPress={() => {
                Alert.alert(
                    "Pay using "+item.name,
                    "Get Payment Code after click pay, Are you sure?",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Pay", onPress: () => {
                            nav.navigate("user/payment/detail")
                        } }
                    ],
                    { cancelable: false }
                );
            }}
        >
            <Text
                style={{
                    color: theme.UIColors.primary,
                }}
            >
                {item.name}
            </Text>
        </Button>
    );
});
