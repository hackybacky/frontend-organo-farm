import React from "react";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { useState } from "react";
import { darkTheme, lightTheme } from "./utils/Theme";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import { Search } from "./pages/Search";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const Main = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
`;
toast.configure();
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Main>
          <Navbar />
          <Content>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Routes>
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route path="subscription" element={<Home type="sub" />} />
                <Route path="signin" element={<Signin />} />
                <Route path="search" element={<Search />} />
                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Routes>
            </Wrapper>
          </Content>
        </Main>
      </BrowserRouter>
    </ThemeProvider>
  );
}
