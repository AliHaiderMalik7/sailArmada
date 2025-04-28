import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Popover,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/searchSlice";
import i18n from "i18next";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state: RootState) => state.search.selectedLanguage
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("Call us");

  const togglePopup = (open: boolean) => {
    setPopupOpen(open);
  };

  const menuItems = [
    { label: "Call us", action: "tel:+40744276232" },
    { label: "About us", action: "navigate", route: "/general" },
    { label: "Contacts", action: "navigate", route: "/contact" },
  ];

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleMenuItemClick = (item: any) => {
    setSelectedItem(item.label);
    if (item.action === "navigate" && item.route) {
      navigate(item.route); // Navigate to specified route
    } else if (item.action.startsWith("tel:")) {
      window.location.href = item.action; // Open phone call
    }
  };

  const handleLanguageChange = (language: string) => {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language.toLowerCase()).catch((error) => {
      console.error("Error changing language:", error);
    });
    handleCloseMenu();
  };

  // Popover handlers for phone number
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const open = Boolean(popoverAnchorEl);

  const languages = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "it", label: "Italiano" },
  ];

  return (
    <>
      {!isSmallScreen && (
        <AppBar
          position="absolute"
          style={{ background: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Link to="/">
                <img
                  src="/assets/images/logo.png"
                  alt="Sail Armada"
                  style={{ height: "30px" }}
                />
              </Link>
            </Box>
            {/* Phone Number with Popover */}
            <Typography
              variant="body1"
              style={{
                marginLeft: "auto",
                marginRight: "16px",
                cursor: "pointer",
              }}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              +40 744276232
            </Typography>

            <Popover
              sx={{ pointerEvents: "none" }} // Keeps popover open only on hover
              open={open}
              anchorEl={popoverAnchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Box
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "1rem",
                  borderRadius: "8px",
                  minWidth: "220px",
                  textAlign: "center", // Center align the content
                }}
              >
                {/* Title */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "#00ff00",
                    marginBottom: "8px", // Space below title
                  }}
                >
                  Call us for any reason!
                </Typography>

                {/* Time and Days */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column", // Stack vertically
                    alignItems: "center", // Center horizontally
                    gap: "8px", // Gap between rows
                  }}
                >
                  {[
                    { day: "Monday", time: "8 AM – 7 PM" },
                    { day: "Tuesday", time: "8 AM – 7 PM" },
                    { day: "Wednesday", time: "8 AM – 7 PM" },
                    { day: "Thursday", time: "8 AM – 7 PM" },
                    { day: "Friday", time: "8 AM – 7 PM" },
                    { day: "Saturday", time: "Closed" },
                    { day: "Sunday", time: "Closed" },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        maxWidth: "200px", // Ensure max-width for alignment
                        gap: "16px", // Add gap between day and time
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          flex: 1, // Ensures alignment
                          textAlign: "left",
                        }}
                      >
                        {item.day}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          textAlign: "right",
                          color: "#ccc", // Slightly greyed-out time
                          flex: 1,
                        }}
                      >
                        {item.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Popover>

            {/* Language Switcher */}
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={handleOpenMenu}
            >
              <img
                src="/assets/images/translateIcon.svg"
                alt="Translate Icon"
                style={{ height: "24px", marginRight: "8px" }}
              />
              <Typography variant="body1" style={{ marginRight: "8px" }}>
                {languages.find((lang) => lang.code === selectedLanguage)
                  ?.label || "English"}
              </Typography>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      )}

      {/* Mobile View */}
      {isSmallScreen && (
        <>
          {/* Mobile Header */}
          <AppBar
            position="relative"
            sx={{
              backgroundColor: "#fff",
              boxShadow: "none",
              borderBottom: "1px solid #eee",
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Logo */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#0077ff",
                  textTransform: "lowercase",
                }}
              >
                Sail Armada
              </Typography>

              {/* Hamburger Icon */}
              <IconButton
                onClick={() => togglePopup(true)}
                sx={{ color: "#000" }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Popup Overlay */}
          {isPopupOpen && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                zIndex: 1300, // Higher than other elements
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              }}
            >
              {/* Popup Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    alignItems: "center",
                    color: "#0077ff",
                    textTransform: "lowercase",
                  }}
                >
                  Sail Armada
                </Typography>
                <IconButton
                  onClick={() => togglePopup(false)}
                  sx={{ color: "#000" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Menu Items */}
              <List sx={{ padding: "0 16px" }}>
                {menuItems.map((item) => (
                  <ListItem
                    key={item.label}
                    onClick={() => handleMenuItemClick(item)} // Handle click
                    sx={{ cursor: "pointer", padding: "8px 0" }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight:
                          selectedItem === item.label ? "bold" : "normal",
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              {/* Footer */}
              <Box
                sx={{
                  marginTop: "auto",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  borderTop: "1px solid #ddd",
                }}
              >
                <LanguageIcon sx={{ marginRight: "8px", color: "#000" }} />
                <Typography variant="body1">English</Typography>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Header;
