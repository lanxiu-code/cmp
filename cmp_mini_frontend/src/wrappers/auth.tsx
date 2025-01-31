import { getCurrentUser } from "@/store/user";
import { useDidShow, useRouter } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const userInfo = useSelector((state: any) => state.user.userInfo);
    const dispatch = useDispatch();
    useDidShow(async () => {
      if (!userInfo?.id) {
        if (
          !router.path.includes("user/login") &&
          !router.path.includes("user/register")
        ) {
          await dispatch(getCurrentUser() as any);
        }
      }
    });
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
