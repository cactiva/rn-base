import { FlatList, Image, Screen, TopBar, View } from "@src/libs";
import api from "@src/libs/utils/api";
import { toJS } from "mobx";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect, useState, useRef } from "react";
import { Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import Path from "path";
import LottieView from "lottie-react-native";

export default observer(() => {
  const meta = useObservable({
    photos: [],
    loading: true,
  });
  const animation = useRef(null);
  const getPhotos = async (page = 1) => {
    let data = toJS(meta.photos);
    const res: any = await api({
      url: `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c016f50181b3a217e936859b76813c1d&tags=nature&per_page=500&page=${page}&format=json&nojsoncallback=1`,
      method: "get",
    });
    if (Array.isArray(res.photos.photo)) {
      data = data.concat(res.photos.photo);
      meta.photos = data;
    }
    if (res.photos.page < 5) {
      getPhotos(res.photos.page + 1);
    }
  };

  const renderItem = ({ item }) => <RenderItem item={item} />;

  const init = async () => {
    await getPhotos();
    // meta.loading = false;
  };

  useEffect(() => {
    // if (!!animation.current) animation.play();
    init();
    return () => {};
  }, []);

  return (
    <Screen>
      <TopBar>Gallery</TopBar>
      <FlatList
        data={toJS(meta.photos)}
        extraData={meta}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.server}${item.farm}${item.id}`}
        numColumns={3}
        columnWrapperStyle={{
          flexWrap: "wrap",
          flex: 1,
          justifyContent: "space-around",
        }}
        windowSize={21}
        removeClippedSubviews={true}
        initialNumToRender={30}
        maxToRenderPerBatch={40}
        updateCellsBatchingPeriod={80}
      />
    </Screen>
  );
});

const RenderItem = observer(({ item }: any) => {
  const dim = Dimensions.get("window");
  const uri = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`;

  return (
    <View
      shadow
      style={{
        overflow: "hidden",
        borderRadius: 4,
        width: (dim.width - 100) / 3,
        height: (dim.width - 100) / 3,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        backgroundColor: "white",
      }}
    >
      <Image
        source={{
          uri,
        }}
        preview
        resizeMode={"cover"}
        style={{
          width: (dim.width - 100) / 3,
          height: (dim.width - 100) / 3,
        }}
      />
    </View>
  );
});
