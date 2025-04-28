import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Autocomplete,
  Badge,
  FormControl,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "antd"; // Import Ant Design DatePicker
// import "antd/dist/antd.css";
import { SearchOption } from "../utils/mockDataAutoSearch";
import BedsSelector from "./common/BedsSelector";
import {
  debounce,
  fetchBoatTypes,
  fetchLocationSearch,
  searchYachts,
} from "../utils/boatApi";
import { useDispatch, useSelector } from "react-redux";
import { setAllData, setSearchResultsSlice } from "../store/searchSlice";
import { RootState } from "../store/store";
import { getDefaultDateRange, normalizeDateToUTC } from "../utils/dateUtils"; // Import the utility function
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;
const SearchCard: React.FC = () => {
  const searchData = useSelector((state: RootState) => state.search);
  const pickerRef = useRef<any>(null);
  const { t } = useTranslation() as any;

  // console.log("tttttttttttttttt",t)

  const [searchResults, setSearchResults] = useState<SearchOption[]>([]);
  const [boatTypes, setBoatTypes] = useState<any>([]);
  const [selectedBoatType, setSelectedBoatType] = useState<any>(
    searchData?.selectedBoatType
  );
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null); // Updated type
  const [beds, setBeds] = useState<number>(0);
  const [loadingBoatTypes, setLoadingBoatTypes] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingClickSearch, setLoadingClickSearch] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadBoatTypes = async () => {
      setLoadingBoatTypes(true);
      try {
        const boatTypesData = await fetchBoatTypes();
        setBoatTypes([{ id: 0, label: "All Types" }, ...boatTypesData]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingBoatTypes(false);
      }
    };
    loadBoatTypes();
  }, []);
  

  React.useEffect(() => {
    if (searchData.searchResults?.count > 0) {
      setSelectedLocation(searchData?.selectedLocation);
      setBeds(searchData?.beds);
      setDateRange(
        searchData?.checkIn && searchData?.checkOut
          ? [new Date(searchData.checkIn), new Date(searchData.checkOut)]
          : null
      );
      setSelectedBoatType(
        searchData?.selectedBoatType
          ? searchData?.selectedBoatType
          : boatTypes[0]
      );
      setBoatTypes(searchData?.boatTypes ? searchData?.boatTypes : boatTypes);
    }
  }, [searchData]);

  React.useEffect(() => {
    if (boatTypes?.length > 0) {
      setSelectedBoatType(boatTypes[0] || null);
    }
  }, [boatTypes]);

  const handleLocationSearch = useCallback(
    debounce(async (query: string) => {
      setLoadingLocation(true);
      try {
        setError(null);
        const results = await fetchLocationSearch(query);
        setSearchResults(results);
      } catch {
        setError("Failed to fetch locations");
      } finally {
        setLoadingLocation(false);
      }
    }, 500),
    []
  );

  const handleSearchClick = async () => {
    // If dateRange is not selected, set default dates
    const [checkIn, checkOut] = dateRange || getDefaultDateRange();

    const country = selectedLocation?.shortName || selectedLocation?.code || "";
    const selectedBoatTypeLabel =
      selectedBoatType?.label === "All Types"
        ? ""
        : selectedBoatType?.label || "";
    const city = selectedLocation?.city;
    const id = selectedLocation?.id;

    const normalizedCheckIn = normalizeDateToUTC(checkIn);
    const normalizedCheckOut = normalizeDateToUTC(checkOut);

    try {
      setLoadingClickSearch(true);

      const yachtResults = await searchYachts(
        normalizedCheckIn,
        normalizedCheckOut,
        country,
        "EUR",
        selectedBoatTypeLabel || "",
        beds,
        1,
        city,
        id
      );

      const data = {
        selectedCheckIn: checkIn.toISOString(),
        selectedCheckOut: checkOut.toISOString(),
        selectedLocation,
        selectedBoatTypeLabel,
        beds,
        selectedBoatType,
        boatTypes: boatTypes,
      };

      dispatch(setSearchResultsSlice(yachtResults));
      dispatch(setAllData(data));
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoadingClickSearch(false);
    }
  };

  const handleOpenCalendar = () => {
    if (pickerRef.current) {
      pickerRef.current.open();
    }
  };

  const containerStyles = {
    border: "1px solid #d3d3d3",
    borderRadius: "8px",
    padding: "5px 0px 5px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    width: "98%",
  };

  const dividerStyles = {
    width: "1px",
    background: "#d3d3d3",
    height: "40px",
    margin: "0 10px",
  };

  const labelStyles = {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#888",
    marginBottom: "0px",
  };

  const valueStyles = {
    fontSize: "14px",
    color: "#555",
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: { xs: 0, md: "8rem" },
      }}
    >
      <Card
        sx={{
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          minWidth: "300px",
          maxWidth: "378px",

          // Adjust for mobile screens
          "@media (max-width: 900px)": {
            width: "93%",
            maxWidth: "93%",
            padding: "0", // Remove padding on mobile
            boxShadow: "none", // Remove shadow on mobile
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            {t("rent_title")}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "#5f5f5f" }}
          >
            {t("rent_desc")}{" "}
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
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
                      handleLocationSearch(value);
                    }
                  }}
                  onChange={(event, value) => {
                    setSelectedLocation(value);
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
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
                            <Typography>
                              {option.name},{" "}
                              {option.countryName || option.country}
                            </Typography>
                          ) : (
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
                      InputLabelProps={{
                        shrink: true,
                        sx: {
                          fontWeight: "bold",
                          color: "#6d6d6d",
                        },
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          borderRadius: "8px",
                          borderColor: "#ccc",
                          "&:hover": {
                            borderColor: "#888",
                          },
                        },
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
                  sx={{
                    "& .MuiAutocomplete-inputRoot": {
                      borderRadius: "8px",
                    },
                  }}
                />
                {error && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ marginTop: "8px" }}
                  >
                    {error}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <RangePicker
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
                      height: "56px"
                    }}
                    format="DD/MM/YYYY"
                    placeholder={["Check-in", "Check-out"]}
                    onChange={(dates) =>
                      setDateRange(
                        dates && dates[0] && dates[1]
                          ? [dates[0].toDate(), dates[1].toDate()]
                          : null
                      )
                    }
                    value={
                      dateRange
                        ? [dayjs(dateRange[0]), dayjs(dateRange[1])]
                        : undefined
                    }
                    disabledDate={(current) =>
                      current && current.isBefore(dayjs().startOf("day"))
                    }
                    separator={
                      <div
                        style={{
                          width: "1px",
                          height: "24px",
                          backgroundColor: "#e0e0e0",
                          margin: "0 12px",
                        }}
                      />
                    }
                    cellRender={(current: Dayjs | string | number) => {
                      if (dayjs.isDayjs(current)) {
                        const isSaturday = current.day() === 6;
                        const defaultCell = (
                          <div className="ant-picker-cell-inner">
                            {current.date()}
                          </div>
                        );

                        return isSaturday ? (
                          <div
                            style={{
                              color: "#000000",
                              fontWeight: "bold",
                            }}
                          >
                            {defaultCell}
                          </div>
                        ) : (
                          defaultCell
                        );
                      }
                      return null;
                    }}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <Box sx={containerStyles}>
                  <Box sx={{ textAlign: "left", width: "50%" }}>
                    <Typography sx={labelStyles}>BOAT TYPE</Typography>
                    <Autocomplete
                      options={boatTypes}
                      value={selectedBoatType}
                      onChange={(event, newValue) =>
                        setSelectedBoatType(newValue || "All types")
                      }
                      filterOptions={(options) => options.slice(0, 5)} // Show only first 4 options
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          placeholder="All types"
                          InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                          }}
                          sx={valueStyles}
                        />
                      )}
                    />
                  </Box>

                  {/* Divider */}
                  <Box sx={dividerStyles} />

                  {/* Beds Section */}
                  <Box sx={{ textAlign: "left", width: "50%" }}>
                    <Typography sx={labelStyles}>BEDS</Typography>
                    <FormControl fullWidth>
                      <BedsSelector value={beds} onChange={setBeds} />
                    </FormControl>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#f04e23",
                    borderRadius: "8px",
                    height: "100%",
                    fontSize: "1rem",
                  }}
                  startIcon={
                    loadingClickSearch ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  onClick={handleSearchClick}
                  disabled={loadingClickSearch}
                >
                  {loadingClickSearch ? "Searching..." : "Search"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SearchCard;
