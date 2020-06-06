import { Text, Screen, Button, View, TopBar, Container, formatMoney, Icon, uuid } from "@src/libs";
import React from "react";
import logout from "@src/services/logout";
import { observer, useObservable } from "mobx-react-lite";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Info from "@src/pages/Payment/Info";
import PaymentMethod from "@src/pages/Payment/Method";
import theme from "@src/theme";
import { toJS } from "mobx";
import { dateFormat } from "@src/libs/utils/date";

export default observer(() => {
    const dim = Dimensions.get("window");
    const nav = useNavigation();
    const route = useRoute();
    const meta = useObservable({
        method: "va",
        panduan: [
            { "id": 1, "name": "ATM BCA", "description": "menggunakan atm bca" },
            { "id": 2, "name": "BCA Mobile", "description": "menggunakan bca mobile" },
            { "id": 3, "name": "BCA I-Bank", "description": "menggunakan bca I-Bank" },
        ],
        panduanSelected: null,
    });
    return (
        <Screen>
            <TopBar backButton={true}>
                Payment
            </TopBar>
            <Container
                style={{
                    padding: 15,
                    backgroundColor: "#fff"
                }}
            >
                <Text
                    style={{
                        fontSize: 16
                    }}
                >
                    Segera selesaikan pembayaran anda sebelum expired.
                </Text>
                <View
                    style={{
                        backgroundColor: "#f1f1f1",
                        padding: 15,
                        marginVertical: 15
                    }}
                >
                    <Text>
                        Expired at :
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                        >
                            12:50 AM
                        </Text>
                    </View>
                    <Text
                        style={{
                            textAlign: "center"
                        }}
                    >
                        ({dateFormat(new Date(), "dd MMM yyyy")})
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 16
                    }}
                >
                    Transfer pembayaran ke nomor Virtual Account :
                </Text>
                <View
                    style={{
                        padding: 15,
                        marginVertical: 15
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                        >
                            80777-085203427470
                        </Text>
                    </View>
                </View>
                <Text
                    style={{
                        fontSize: 16
                    }}
                >
                    Jumlah yang harus di bayar :
                </Text>
                <View
                    style={{
                        borderRadius: 10,
                        padding: 15,
                        marginVertical: 15
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: "#f05e23"
                            }}
                        >
                            {formatMoney(89000000, "Rp. ")}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{
                        fontSize: 16
                    }}
                >
                    Panduan Pembayaran
                </Text>
                <View>
                    {
                        Array.isArray(meta.panduan) && meta.panduan.map((item) => {
                            return (
                                <View key={uuid()}>
                                    <Button
                                        mode={"outlined"}
                                        onPress={() => {
                                            meta.panduanSelected = item.id
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: "row"
                                            }}
                                        >
                                            <Text
                                                style={{ flex: 1 }}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text>
                                                <Icon
                                                    name={meta.panduanSelected == item.id ? "ios-arrow-down" : "ios-arrow-up"}
                                                    color={theme.UIColors.primary}
                                                    size={16}
                                                    style={{
                                                        margin: 0,
                                                    }}
                                                />
                                            </Text>
                                        </View>
                                    </Button>
                                    {
                                        meta.panduanSelected == item.id ?
                                            (<View
                                                style={{
                                                    backgroundColor: theme.UIColors.background,
                                                    padding: 15,
                                                    marginHorizontal: 5
                                                }}
                                            >
                                                <Text>
                                                    {item.description}
                                                </Text>
                                            </View>) : null
                                    }
                                </View>
                            );
                        })
                    }
                </View>
                <Button
                    onPress={() => {
                        nav.navigate("user/payment/response", { status: true })
                    }}
                >
                    <Text style={{ color: "#fff" }}>success</Text>
                </Button>
                <Button
                    onPress={() => {
                        nav.navigate("user/payment/response", { status: false })
                    }}
                >
                    <Text style={{ color: "#fff" }}>failed</Text>
                </Button>
            </Container>
        </Screen>
    );
});
