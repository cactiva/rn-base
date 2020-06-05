import { Text, Screen, Button, View, TopBar, Container, formatMoney } from "@src/libs";
import React from "react";
import logout from "@src/services/logout";
import { observer, useObservable } from "mobx-react-lite";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default observer(({ item }: any) => {
    const dim = Dimensions.get("window");
    const nav = useNavigation();
    const route = useRoute();
    const meta = useObservable({});

    return (
        <View
            style={{
                backgroundColor: "#f1f1f1",
                borderRadius: 10,
                padding: 15,
                marginVertical:15
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        width: "30%",
                        color: "gray"
                    }}
                >
                    Date
                </Text>
                <Text
                    style={{
                        fontWeight: "bold"
                    }}
                >
                    12 Jan 3019
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        width: "30%",
                        color: "gray"
                    }}
                >
                    Bill ID
                </Text>
                <Text
                    style={{
                        fontWeight: "bold"
                    }}
                >
                    JX1922B
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        width: "30%",
                        color: "gray"

                    }}
                >
                    Billing Addr.
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        width: "70%",
                        fontWeight: "bold"
                    }}
                >
                    199, Beach Rd, Kind Av 19228 UK asdasd
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        width: "30%",
                        color: "gray"

                    }}
                >
                    Email
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        width: "70%",
                        fontWeight: "bold"
                    }}
                >
                    john@gmail.com
                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{
                        width: "30%",
                        color: "gray"

                    }}
                >
                    Name
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        width: "70%",
                        fontWeight: "bold"
                    }}
                >
                    John Doe
                </Text>
            </View>
        </View>
    );
});
