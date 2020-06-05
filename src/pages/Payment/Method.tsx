import { Text, Screen, Button, View, TopBar, Container, formatMoney, Form, Field, Select, Input, FlatList, uuid } from "@src/libs";
import React from "react";
import logout from "@src/services/logout";
import { observer, useObservable } from "mobx-react-lite";
import { Dimensions, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CreditCart from "@src/pages/Payment/MethodCC";
import MethodCC from "@src/pages/Payment/MethodCC";
import RenderItem from "./RenderItem";

export default observer(({ item }: any) => {
    const dim = Dimensions.get("window");
    const nav = useNavigation();
    const route = useRoute();
    const meta = useObservable({
        cc: {} as any,
        ew: [
            { "id": 1, "name": "Bca" },
            { "id": 2, "name": "Bni" },
            { "id": 3, "name": "Bri" },
            { "id": 4, "name": "Mandiri" },
            { "id": 5, "name": "Permata" },
            { "id": 6, "name": "Btn" },
        ],
        va: [
            { "id": 1, "name": "dana" },
            { "id": 2, "name": "gopay" },
            { "id": 3, "name": "ovo" },
        ],
        county: [],
        method: "cc",
    });

    const cc = () => {
        alert("cc")
    }

    return (
        <View
            style={{
                flex: 1,
                marginVertical: 15
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center"
                }}
            >
                <Button
                    style={{
                        width: "31.5%",
                    }}
                    onPress={() => {
                        meta.method = "cc"
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            textAlign: "center"
                        }}
                    >
                        Credit Card
                            </Text>
                </Button>
                <Button
                    style={{
                        width: "31.5%",
                    }}
                    onPress={() => {
                        meta.method = "ew"
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            textAlign: "center"
                        }}
                    >
                        E-Wallet
                            </Text>
                </Button>
                <Button
                    style={{
                        width: "31.5%",
                    }}
                    onPress={() => {
                        meta.method = "va"
                    }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            textAlign: "center"
                        }}
                    >
                        Virtual Account
                    </Text>
                </Button>
            </View>
            <View
                style={{
                    backgroundColor: "#f4f6ff",
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    paddingVertical: 10
                }}
            >
                {meta.method == "cc" ?
                    (<MethodCC item={meta} />) :
                    (
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between"
                            }}
                        >
                            {
                                meta.method == "ew" ?
                                    (Array.isArray(meta.ew) && meta.ew.map((item) => {
                                        return (<RenderItem item={item} />);
                                    })) : (
                                        meta.method == "va" ?
                                            (Array.isArray(meta.va) && meta.va.map((item) => {
                                                return (<RenderItem item={item} />);
                                            })) : null
                                    )
                            }
                        </View>
                    )
                }
            </View>
        </View>

    );
});
