import { Text, Screen, Button, View, TopBar, Container, formatMoney } from "@src/libs";
import React from "react";
import logout from "@src/services/logout";
import { observer, useObservable } from "mobx-react-lite";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Info from "@src/pages/Payment/Info";
import PaymentMethod from "@src/pages/Payment/Method";
import theme from "@src/theme";

export default observer(() => {
    const dim = Dimensions.get("window");
    const nav = useNavigation();
    const route = useRoute();
    const meta = useObservable({});

    return (
        <Screen>
            <TopBar
                backButton={true}
            >
                Payment
            </TopBar>
            <Container
                style={{
                    padding: 15,
                    backgroundColor: "#fff"
                }}
            >

                <View
                    style={{
                        flex: 1,
                        flexDirection: "row"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            flex: 1
                        }}
                    >
                        Payment Detail
                </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: theme.UIColors.primary
                        }}
                    >
                        {formatMoney(89000000, "Rp. ")}
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: "right"
                    }}
                >
                    Invoice #28928
                    </Text>

                <Info item={meta} />

                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 15
                    }}
                >
                    Payment Method
                </Text>
                <PaymentMethod item={meta} />
            </Container>
        </Screen>
    );
});
