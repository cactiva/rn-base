import { Text, Screen, Button, View, TopBar, Container, formatMoney, Icon } from "@src/libs";
import React, { useEffect } from "react";
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
        status: null,
    });

    let { status }: any = route.params || {};

    useEffect(() => {
        meta.status = status;
    }, [status])

    return (
        <Screen>
            <TopBar>
                Payment
            </TopBar>
            <Container
                style={{
                    padding: 15,
                }}
            >
                { meta.status != null ? (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Icon
                        name={meta.status == true ? "ios-checkmark-circle-outline" : "ios-close-circle-outline"}
                        color={meta.status == true ? theme.UIColors.success : theme.UIColors.danger}
                        size={150}
                        style={{
                            margin: 0,
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 25,
                            color: meta.status == true ? theme.UIColors.success : theme.UIColors.danger
                        }}
                    >
                        {meta.status == true ? "Success" : "Failed"}
                    </Text>
                    <Text
                        style={{
                            fontSize: 25,
                            color: meta.status == true ? theme.UIColors.success : theme.UIColors.danger,
                            textAlign: "center"
                        }}
                    >

                        {meta.status == true ? "Congratulation!!!" : "The balance is not sufficient."}
                    </Text>
                    <Text
                        style={{
                            fontSize: 25,
                            color: meta.status == true ? theme.UIColors.success : theme.UIColors.danger,
                            textAlign: "center"
                        }}
                    >

                        {meta.status == false ? "Your Payment is Expired." : null}
                    </Text>
                </View>
                ):null}
            </Container>
        </Screen>
    );
});
