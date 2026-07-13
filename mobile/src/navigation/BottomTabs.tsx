import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import { BottomTabBar } from './BottomTabBar';
import { HomeScreen } from '@/screens/Home/HomeScreen';
import { CategoriesScreen } from '@/screens/Categories/CategoriesScreen';
import { WishlistScreen } from '@/screens/Wishlist/WishlistScreen';
import { CartScreen } from '@/screens/Cart/CartScreen';
import { ProfileScreen } from '@/screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Categories" component={CategoriesScreen} options={{ title: 'Categories' }} />
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ title: 'Wishlist' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
