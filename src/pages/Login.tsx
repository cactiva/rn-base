import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  Container,
  Field,
  Form,
  Icon,
  Image,
  Input,
  Screen,
  Spinner,
  Text,
  View,
} from "@src/libs";
import Theme from "@src/libs/theme";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { Dimensions } from "react-native";
import session from "../stores/session";
import { setSession } from "@src/services/checkSession";

export default observer(() => {
  const dim = Dimensions.get("window");
  const nav = useNavigation();
  const route = useRoute();
  const meta = useObservable({
    loading: false,
    data: {
      username: "user",
      password: "12345",
    } as any,
    mode: "login",
  });

  const submit = async () => {
    meta.loading = true;
    if (meta.mode === "login") {
      setSession({
        jwt: "example",
        user: {
          id: 1,
          fullname: "user",
          role: "user",
        },
      });
      meta.loading = false;
    } else {
      alert("This is example to forgot password.");
      meta.loading = false;
    }
  };

  return (
    <Screen
      style={{
        backgroundColor: Theme.UIColors.primary,
      }}
    >
      <Container
        style={{
          padding: 20,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexGrow: 1,
            flexShrink: 1,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                lineHeight: 26,
                fontSize: 26,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Hy,
            </Text>
            <Text
              style={{
                lineHeight: 26,
                fontSize: 26,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              ready for work?
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
              }}
            >
              Welcome back to apps.
            </Text>
          </View>
          <Form
            shadow
            style={{
              padding: 20,
              backgroundColor: "#fff",
              borderRadius: 14,
            }}
            data={meta.data}
            onSubmit={submit}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Image
                style={{
                  height: 120,
                  width: 120,
                }}
                source={require("@src/assets/images/logo.png")}
                disableLoading
              />
            </View>
            <Field label={"Username"} path={"username"} isRequired={true}>
              <Input type={"text"}></Input>
            </Field>
            {meta.mode === "login" ? (
              <>
                <Field label={"Password"} path={"password"} isRequired={true}>
                  <Input type={"password"}></Input>
                </Field>
                <View
                  style={{
                    flexDirection: "column-reverse",
                  }}
                >
                  <Button
                    mode={"clean"}
                    style={{
                      alignSelf: "flex-end",
                      paddingHorizontal: 10,
                      minHeight: 30,
                      height: 30,
                    }}
                    onPress={() => (meta.mode = "forgot")}
                  >
                    <Text>Forgot password?</Text>
                  </Button>
                  <Button
                    style={{
                      width: 150,
                      alignSelf: "flex-end",
                      borderRadius: 5,
                    }}
                    type={"submit"}
                    disabled={meta.loading}
                  >
                    {meta.loading ? (
                      <Spinner color="#fff"></Spinner>
                    ) : (
                      <Text
                        style={{
                          color: "#fafafa",
                          fontWeight: "bold",
                        }}
                      >
                        Login
                      </Text>
                    )}
                  </Button>
                </View>
              </>
            ) : (
              <>
                <Button
                  style={{
                    width: 150,
                    alignSelf: "flex-end",
                    borderRadius: 5,
                  }}
                  type={"submit"}
                  disabled={meta.loading}
                >
                  {meta.loading ? (
                    <Spinner color="#fff"></Spinner>
                  ) : (
                    <Text
                      style={{
                        color: "#fafafa",
                        fontWeight: "bold",
                      }}
                    >
                      Submit
                    </Text>
                  )}
                </Button>

                <Button
                  mode={"clean"}
                  style={{
                    alignSelf: "flex-end",
                    paddingHorizontal: 10,
                    minHeight: 30,
                    height: 30,
                  }}
                  onPress={() => (meta.mode = "login")}
                >
                  <Icon name="ios-arrow-round-back" size={24} />
                  <Text
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    Back to login.
                  </Text>
                </Button>
              </>
            )}
          </Form>
        </View>
      </Container>
    </Screen>
  );
});
