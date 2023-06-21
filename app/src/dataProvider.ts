import { DataProvider } from "react-admin";
import fakerestDataProvider from "ra-data-fakerest";
import getProfileFromToken from "./getProfileFromToken";

const dataProvider = fakerestDataProvider({
  resource: [],
});

export default dataProvider;
