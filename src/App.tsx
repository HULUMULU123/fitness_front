import { useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  Link,
  Outlet,
} from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Roboto from "./assets/fonts/Roboto-VariableFont_wdth,wght.ttf";
import { FaHouse, FaCalendarCheck, FaDumbbell, FaUser } from "react-icons/fa6";
import TrainPlan from "./pages/TrainPlan";
import TrainingGuide from "./pages/TrainingGuide";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import useGlobal from "./hooks/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WeightGainForm from "./components/Profile/WeightGainForm";
import ModalWrapper from "./components/ModalWrapper";
import WeightLossForm from "./components/Profile/WeightLossForm";
import BodyChart from "./components/Profile/BodyCharts";
import ProgressPhotoTable from "./components/Profile/ProgressPhotoTable";
import UploadPhotoForm from "./components/Profile/UploadPhotoForm";
import VitaminTable from "./components/Profile/VitaminTable";
import Train from "./components/Train/Train";
import LoadingSpinner from "./components/LoadingSpinner";
import Exercise from "./components/Exercise/Exercise";
import Wish from "./components/Wish/Wish";
import QuestionnaireForm from "./components/Profile/QuestionnaireForm";
const queryClient = new QueryClient();
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto}) format('truetype');
    font-weight: 100 900;
    font-style: normal;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #000;
    color: #fff;
    width: 100%;
    overflow-x: hidden;
  }

  /* Адаптация шрифта под маленькие экраны */
  @media (max-width: 375px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 320px) {
    html {
      font-size: 13px;
    }
  }
`;

// Заглушки для отсутствующих страниц
const Plan = () => <div>План</div>;
const Guide = () => <div>Справочник</div>;

const StyledBackground = styled.div`
  background-color: #000;
  display: flex;
  justify-content: center;

  width: 100vw;
  height: 100vh; /* фиксированная высота, не min-height */
  overflow: hidden; /* скрываем прокрутку */
`;

const AppContainer = styled.div`
  background-color: #000;
  width: 100%;
  height: 100%;
  overflow-y: auto; /* включаем прокрутку здесь */
  overflow-x: hidden;

  -webkit-overflow-scrolling: touch; /* для плавности на мобилках */

  @media (max-width: 480px) {
    padding: 0;
  }
  @media (max-width: 375px) {
    padding: 0;
  }
  @media (max-width: 320px) {
    padding: 0;
  }
`;

const Navigation = styled.nav<{ visible: boolean }>`
  position: fixed;
  bottom: 1.5rem;
  width: 100%;
  max-width: 320px;
  background-color: #262626;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50px;
  /* opacity: ${({ visible }) => (visible ? 1 : 0)}; */
  transform: ${({ visible }) =>
    visible ? "translateX(-50%)" : "translateX(-50%) translateY(200%)"};
  transition: all 0.1s ease-out;

  @media (max-width: 375px) {
    bottom: 1.2rem;
    padding: 9px 0;
  }

  @media (max-width: 320px) {
    bottom: 1rem;
    padding: 8px 0;
    border-radius: 40px;
  }
`;

const NavButton = styled(Link)<{ isActive: boolean }>`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#fff" : "transparent")};
  color: ${(props) => (props.isActive ? "#000" : "#fff")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#fff" : "transparent")};
    color: ${(props) => (props.isActive ? "#000" : "#fff")};
  }

  @media (max-width: 375px) {
    width: 36px;
    height: 36px;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 320px) {
    width: 32px;
    height: 32px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

function NavBar({ visible }) {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <FaHouse size={24} />, label: "Главная" },
    { path: "/plan", icon: <FaCalendarCheck size={24} />, label: "План" },
    { path: "/profile", icon: <FaUser size={24} />, label: "Профиль" },
  ];

  return (
    <Navigation visible={visible}>
      {navItems.map((item) => (
        <NavButton
          key={item.path}
          to={item.path}
          isActive={location.pathname === item.path}
          aria-label={item.label}
        >
          {item.icon}
        </NavButton>
      ))}
    </Navigation>
  );
}

// Обёртка для отображения общего layout-а и маршрутов
function Layout({ scrollRef }) {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const scrollEl = scrollRef?.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const currentScrollPos = scrollEl.scrollTop;
      const isScrollingUp = currentScrollPos < prevScrollPos;

      setVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [scrollRef, prevScrollPos]);

  return (
    <>
      <Outlet />
      <NavBar visible={visible} />
    </>
  );
}

function App() {
  const webApp = useWebApp();
  const sendData = useGlobal((state) => state.sendData);
  const isLoading = useGlobal((state) => state.isLoading);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout scrollRef={scrollRef} />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/plan", element: <TrainPlan /> },
        { path: "/profile", element: <Profile /> },
        {
          path: "/measure",
          element: (
            <ModalWrapper>
              <WeightGainForm />
            </ModalWrapper>
          ),
        },
        {
          path: "/statistics",
          element: (
            <ModalWrapper>
              <BodyChart />
            </ModalWrapper>
          ),
        },
        {
          path: "/photos",
          element: (
            <ModalWrapper>
              <ProgressPhotoTable />
            </ModalWrapper>
          ),
        },
        {
          path: "/update_photo",
          element: (
            <ModalWrapper>
              <UploadPhotoForm />
            </ModalWrapper>
          ),
        },
        {
          path: "/vitamins",
          element: (
            <ModalWrapper>
              <VitaminTable />
            </ModalWrapper>
          ),
        },
        {
          path: "/train",
          element: (
            <ModalWrapper>
              <Train />
            </ModalWrapper>
          ),
        },
        {
          path: "/exercise",
          element: (
            <ModalWrapper>
              <Exercise />
            </ModalWrapper>
          ),
        },
        {
          path: "/wish",
          element: (
            <ModalWrapper>
              <Wish />
            </ModalWrapper>
          ),
        },
        {
          path: "/question",
          element: (
            <ModalWrapper>
              <QuestionnaireForm />
            </ModalWrapper>
          ),
        },
      ],
    },
  ]);
  useEffect(() => {
    if (webApp.initData) {
      sendData(webApp.initData);

      // // Отправка данных пользователя на сервер
      // axios.post(`${YOUR_DOMAIN}/api/auth/telegram`, {
      //   id: webApp.initDataUnsafe.user.id,
      //   first_name: webApp.initDataUnsafe.user.first_name,
      //   last_name: webApp.initDataUnsafe.user.last_name,
      //   username: webApp.initDataUnsafe.user.username,
      //   photo_url: webApp.initDataUnsafe.user.photo_url,
      //   auth_date: webApp.initDataUnsafe.auth_date,
      //   hash: webApp.initDataUnsafe.hash
      // })
      // .then(response => console.log('Auth success:', response.data))
      // .catch(error => console.error('Auth error:', error));
    }
  }, [webApp]);
  if (isLoading) return <LoadingSpinner />;
  return (
    <QueryClientProvider client={queryClient}>
      <StyledBackground>
        <GlobalStyle />
        <AppContainer ref={scrollRef}>
          <RouterProvider router={router} />
        </AppContainer>
      </StyledBackground>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
