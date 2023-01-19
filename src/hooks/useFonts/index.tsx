import * as Font from "expo-font";
 
const useFonts = async () =>
  await Font.loadAsync({
    'Berlin Sans FB Regular': require('../../../assets/fonts/Berlin Sans FB Regular.ttf'),
  });

export default useFonts;