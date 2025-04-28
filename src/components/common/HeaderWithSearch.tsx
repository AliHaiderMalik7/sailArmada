import React, { useState, useEffect,useCallback, useRef } from "react";
// import React from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Autocomplete,
  TextField,
  Badge,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce, fetchLocationSearch } from "../../utils/boatApi";
import { SearchOption } from "../../utils/mockDataAutoSearch";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setAllData } from "../../store/searchSlice";
import { Link } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs"; 

interface HeaderWithSearchProps {
  onSearch: (
    checkIn: string,
    checkOut: string,
    country: string,
    boatType: string,
    beds: number,
    city: string,
    baseFromId: number,
    page: number
  ) => void;
}

const HeaderWithSearch: React.FC<HeaderWithSearchProps> = ({ onSearch }) => {
  const searchData = useSelector((state: RootState) => state.search);
  const [searchResults, setSearchResults] = useState<SearchOption[]>([]);
  const [boatTypes, setBoatTypes] = useState<any>([]);
  const [selectedBoatType, setSelectedBoatType] = useState<any>(
    searchData?.selectedBoatType
  );
  const pickerRef = useRef<any>(null); 
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [beds, setBeds] = useState<number>(0); 
  const [loadingLocation, setLoadingLocation] = useState(false); 
  const [loadingClickSearch, setLoadingClickSearch] = useState(false); 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null); 
  const isSmallScreen = useMediaQuery("(max-width: 900px)"); 

  useEffect(() => {
    if (searchData.searchResults?.count > 0) {
      setSelectedLocation(searchData?.selectedLocation);
      setBeds(searchData?.beds);
      setCheckIn(dayjs(searchData?.checkIn).format("YYYY-MM-DD"));
      setCheckOut(searchData?.checkOut);
      setSelectedBoatType(searchData?.selectedBoatType);
      setBoatTypes(searchData?.boatTypes);
    }
  }, [searchData]);

  const handleLocationSearch = useCallback(
    debounce(async (query: string) => {
      if (!query) return;
      setLoadingLocation(true);
      try {
        const results = await fetchLocationSearch(query);
        setSearchResults(results);
        setError(null);
      } catch {
        setError("Failed to fetch locations");
      } finally {
        setLoadingLocation(false);
      }
    }, 500),
    []
  );

  const handleSearchClick = () => {
    const selectedCheckIn = checkIn;
    const selectedCheckOut = checkOut;

    const country = selectedLocation?.shortName || "";

    const baseFromId = selectedLocation?.id || "";

    const selectedBoatTypeLabel =
      selectedBoatType?.label === "All Types"
        ? ""
        : selectedBoatType?.label || "";

    setLoadingClickSearch(true);
    onSearch(
      selectedCheckIn,
      selectedCheckOut,
      country,
      selectedBoatTypeLabel || "",
      beds,
      selectedLocation?.city,
      baseFromId,
      1
    );
    const data = {
      selectedCheckIn,
      selectedCheckOut,
      selectedLocation,
      selectedBoatTypeLabel,
      beds,
      selectedBoatType,
    };

    dispatch(setAllData(data));
    setLoadingClickSearch(false);
  };

  const styles = {
    border: "1px solid #d3d3d3",
    borderRadius: "8px",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    width: "100%",
  };

  const handleOpenCalendar = () => {
    if (pickerRef.current) {
      pickerRef.current.open(); 
    }
  };

  const handleDateChange = (dates: any | null) => {
    console.log("calleddddddddddddd")
    if (dates && dates[0] && dates[1]) {
      const today = dayjs().startOf("day");
      if (dates[0].isBefore(today) || dates[1].isBefore(today)) {
        // Ignore invalid selections
        // toast.error("Past dates are not allowed.");
        // return;
      }

      console.log("Selected Dates:", dates);
      console.log("Check-In Date:", dates[0]?.format("YYYY-MM-DD"));
      console.log("Check-Out Date:", dates[1]?.format("YYYY-MM-DD"));
      setCheckIn(dates[0].format("YYYY-MM-DD")); // Store as a string
      setCheckOut(dates[1].format("YYYY-MM-DD")); // Store as a string
     
    } else {
      // Reset states if no date range selected
      // setCheckIn(null);
      // setCheckOut(null);
    }
  };
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
      {/* Header Bar with Logo and Contact Info */}
      <Box
        sx={{
          backgroundColor: "#0077cc", 
          color: "white",
          padding: "0.5rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {/* Logo and Tagline */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginRight: "1rem" }}
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}>
            Sail Armada
          </Typography>
          {!isSmallScreen && (
            <Typography variant="subtitle1">
              boat rent, a new way to live the sea
            </Typography>
          )}
        </Box>

        {/* Contact Info */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            +40 744276232
          </Typography>
          <Box sx={{ fontSize: "1.5rem" }}>🌐</Box>
        </Box>
      </Box>

      {/* Search Bar Section */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "1.5rem 7rem",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          "@media (max-width: 900px)": {
            padding: "2rem",
          },
        }}>
        <Grid container spacing={2} alignItems="center">
          {/* "Where" Field with Autocomplete */}
          <Grid item xs={12} sm={4} md={4}>
            <Autocomplete
              freeSolo
              options={searchResults}
              value={selectedLocation}
              isOptionEqualToValue={(option, value) =>
                option.countryName === value.countryName ||
                option.country === value.country
              }
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                return `${option.name || option.city || ""}, ${
                  option.countryName || option.country || ""
                }`;
              }}
              filterOptions={(options) => options}
              onInputChange={(event, value, reason) => {
                if (reason === "input") {
                  handleLocationSearch(value); // Call API only when user types
                }
              }}
              onChange={(event, value) => {
                setSelectedLocation(value); // Update the selected location
              }}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}>
                    <Box sx={{ marginRight: "1rem" }}>
                      <img
                        src={option.imageUrl}
                        alt={option.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                    <Box>
                      {option.id ? (
                        // Show the option name if id exists
                        <Typography>{option.name}</Typography>
                      ) : (
                        // Show city and country if id doesn't exist
                        <>
                          <Typography>
                            {option.city},{" "}
                            {option.countryName || option.country}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {option.countryName || option.country}
                          </Typography>
                        </>
                      )}
                    </Box>
                    <Badge
                      badgeContent={option.yachtCount}
                      color="primary"
                      sx={{ marginLeft: "auto" }}
                      max={10000}
                    />
                  </Box>
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Where"
                  variant="outlined"
                  placeholder="Enter a city, region, etc."
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loadingLocation ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* "Check-in" Field */}
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker.RangePicker
              size="large"
              style={{
                width: "100%", // Set width as per the design
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px 12px",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                background: "#ffffff",
                boxShadow: "none",
                height: "56px",
              }}
              format="DD/MM/YYYY"
              placeholder={["Check-in", "Check-out"]} // Custom placeholders
              value={
                checkIn && checkOut
                  ? [dayjs(checkIn), dayjs(checkOut)]
                  : undefined
              } // Convert Date to Dayjs
              onChange={handleDateChange}
              disabledDate={
                (current) => current && current.isBefore(dayjs().startOf("day")) // Disable past dates
              }
            />
          </Grid>

          {/* "Beds" Field */}
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label="Beds"
              variant="outlined"
              value={beds}
              type="number"
              onChange={(e) => setBeds(Number(e.target.value))}
              InputLabelProps={{ shrink: true }}
              sx={{ "& fieldset": { borderRadius: "8px" } }}
            />
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} sm={4} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#f04e23",
                borderRadius: "8px",
                height: "100%",
                fontSize: "1rem",
                padding: "14px",
              }}
              startIcon={
                loadingClickSearch ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SearchIcon />
                )
              } // Show spinner during loading
              onClick={handleSearchClick}
              disabled={loadingClickSearch}>
              {loadingClickSearch ? "Searching..." : "Search"}{" "}
              {/* Change text during loading */}
            </Button>
          </Grid>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="error"
              sx={{ marginTop: "1rem" }}>
              {error}
            </Typography>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default HeaderWithSearch;
