import { Text, Screen, Button, View, TopBar, Container, formatMoney } from "@src/libs";
import React from "react";
import logout from "@src/services/logout";
import { observer, useObservable } from "mobx-react-lite";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import theme from "@src/theme";

export default observer(({ item }: any) => {
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
            onPress={()=>{
                alert(item.name)
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
