import { Text, Screen, Button, View, TopBar, Container, formatMoney, Form, Field, Select, Input } from "@src/libs";
import React from "react";
import logout from "@src/services/logout";
import { observer, useObservable } from "mobx-react-lite";
import { Dimensions, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Info from "@src/pages/Payment/Info";

export default observer(({ item }: any) => {
    const dim = Dimensions.get("window");
    const nav = useNavigation();
    const route = useRoute();
    const meta = useObservable({});
    
    const cc = () => {
        Alert.alert(
            "Alert Title",
            "My Alert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => nav.navigate("user/payment/detail") }
            ],
            { cancelable: false }
        );
    }

    return (
        <Form
            data={item.cc}
            onSubmit={cc}
            onError={(error) => {
                let field = error
                    .filter((x) => x.status === false)
                    .map((x) => x.label);
                if (field.length > 0) {
                    Alert.alert(
                        "Terjadi Kesalahan",
                        `Mohon Anda lengkapi dahulu kolom ${field.join(", ")}.`
                    );
                }
            }}
            style={{
                width: "100%"
            }}
        >
            <Field
                label={"Card Detail"}
                path={"details"}
                isRequired={true}
            >
                <Input type={"text"} keyboardType={"phone-pad"} placeholder={"5532 4789 xxxx xx"}></Input>
            </Field>
            <View
                style={{
                    flexDirection: "row"
                }}
            >
                <Field
                    label={"Expired Date"}
                    path={"expired_date"}
                    isRequired={true}
                    style={{
                        width: "47.5%"
                    }}
                >
                    <Input type={"text"} keyboardType={"phone-pad"} placeholder={"02/22"}></Input>
                </Field>
                <Field
                    label={"Card Detail"}
                    path={"details"}
                    isRequired={true}
                    style={{
                        width: "47.5%"
                    }}
                >
                    <Input type={"text"} keyboardType={"phone-pad"} placeholder={"252"}></Input>
                </Field>
            </View>
            <Field
                label={"Card Isue Country"}
                path={"country"}
                isRequired={true}
            >
                <Select
                    placeholder={"Select"}
                    labelPath={"name"}
                    items={item.county}
                    valuePath={"id"}
                ></Select>
            </Field>
            <Button
                style={{
                    marginBottom: 15,
                }}
                type={"submit"}
            >
                <Text
                    style={{
                        color: "#fff",
                    }}
                >
                    Pay
                        </Text>
            </Button>
        </Form>
    );
});
