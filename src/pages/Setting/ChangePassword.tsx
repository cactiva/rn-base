import React from "react";
import {
  TopBar,
  Container,
  Screen,
  Form,
  Field,
  Input,
  Button,
  Spinner,
  Text,
} from "@src/libs";
import { observer, useObservable } from "mobx-react-lite";
import api from "@src/libs/utils/api";
import global from "@src/stores/global";
import session from "@src/stores/session";
import { useNavigation } from "@react-navigation/native";

export default observer(() => {
  const nav = useNavigation();
  const meta = useObservable({
    form: {} as any,
    loading: false,
    canSubmit: false,
  });
  const submit = async () => {
    meta.loading = true;
    await api({
      method: "post",
      url: global.serverUrl + "index.php?r=apiAuth/changePassword",
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
      data: {
        password: meta.form.password,
      },
    }).then((res: any) => {
      if (!!res) {
        if (!!res.status && !!res.reauth) {
          session.jwt = res.reauth.jwt;
          session.user = res.reauth.user;
        }
        alert(res.message);
      }
      meta.loading = false;
    });
  };

  const onChangeValid = () => {
    if (
      !!meta.form.password &&
      !!meta.form.repassword &&
      meta.form.password === meta.form.repassword
    ) {
      meta.canSubmit = true;
    } else {
      meta.canSubmit = false;
    }
  };

  return (
    <Screen>
      <TopBar backButton>Ubah Sandi</TopBar>
      <Container>
        <Form
          data={meta.form}
          style={{
            padding: 15,
          }}
          onSubmit={submit}
        >
          <Field
            label={"Password"}
            path={"password"}
            isRequired={true}
            validate={() => {
              let err = [];
              if ((meta.form.password || "").length < 6) {
                err.push("Minimal password 6 huruf.");
              }
              return err;
            }}
          >
            <Input type={"password"}></Input>
          </Field>
          <Field
            label={"Verifikasi Password"}
            path={"repassword"}
            isRequired={true}
            validate={() => {
              let err = [];
              if (meta.form.password !== meta.form.repassword) {
                err.push("Verifikasi password salah.");
              }
              return err;
            }}
            onChange={onChangeValid}
          >
            <Input type={"password"}></Input>
          </Field>
          <Button
            style={{
              marginTop: 30,
            }}
            type={"submit"}
            disabled={!meta.canSubmit}
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
        </Form>
      </Container>
    </Screen>
  );
});
