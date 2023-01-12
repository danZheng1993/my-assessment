import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Main from "./src/screens/Main";
import Detail from "./src/screens/Detail";
import Filters from "./src/screens/Filters";

import { store } from "./src/reducer/cars";
import { ROOT_STACK_PARAM_LIST } from "./src/constants/dataTypes";
import { FiltersList } from "./src/constants/suggestions";

const Stack = createNativeStackNavigator<ROOT_STACK_PARAM_LIST>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ headerBackTitle: "" }}
          />
          <Stack.Screen
            name="Filters"
            component={Filters}
            options={({ route }) => {
              const filter = FiltersList.find(
                (filter) => filter.type === route.params.filterType
              );
              return {
                headerTitle: filter?.label,
                headerBackTitle: "",
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
