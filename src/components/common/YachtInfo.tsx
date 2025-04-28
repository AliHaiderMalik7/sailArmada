import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import SliderComponent from "./CustomCarousal";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import MapBoxComp from "../MapBoxComp";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface YachtInfoProps {
  year: number;
  cabins: number;
  beds: number;
  guests: number;
  bathrooms: number;
  amenities: string[];
  engine: string;
  water_capacity: number;
  sail_type: string;
  fuel_capacity: number;
  length: number;
  services: [];
  yachtAvailability: [];
  additionalServices: [];
  location: any;
  id: any;
}

const YachtInfo: React.FC<YachtInfoProps> = ({
  year,
  cabins,
  beds,
  guests,
  bathrooms,
  amenities,
  engine,
  water_capacity,
  sail_type,
  fuel_capacity,
  length,
  services,
  yachtAvailability,
  additionalServices,
  location,
  id,
}) => {
  const [isOpen, setIsOpen] = React.useState<any>();
  const [showLocation, setShowLocation] = React.useState<any>(true);
  const [showMoreBoats, setShowMoreBoats] = React.useState<any>(true);

  const searchData = useSelector((state: RootState) => state.search);

  const [similarBoats, setSimilarBoats] = React.useState<any>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(
      "Search data received is: ",
      searchData?.searchResults?.results
    );
    console.log("ID received is: ", id);

    // Extract results
    const results = searchData?.searchResults?.results || [];

    if (results.length > 0) {
      // Filter out the item with the matching ID
      const filteredResults = results.filter(
        (result: any) => result?.yachtId !== id
      );

      // Shuffle the filteredResults array
      const shuffledResults = filteredResults.sort(() => Math.random() - 0.5);

      // Pick the first two items from the shuffled array
      const selectedBoats = shuffledResults.slice(0, 3);

      // Update the state
      setSimilarBoats(selectedBoats);
    }
  }, [searchData, id]);

  React.useEffect(() => {
    console.log("similarBoats", similarBoats);
  }, [similarBoats]);

  const locationn = {
    longitude: location.longitude,
    latitude: location.latitude,
  };

  const handleYachtClick = (yacht: any) => {
    console.log("yacht selected is", yacht);
    // Store the selected yacht details in localStorage
    localStorage.setItem("selectedYacht", JSON.stringify(yacht));

    // Navigate to the yacht details page
    navigate(`/yacht-details`, { state: { from: "yachtsLists" } });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          md={6}
          lg={12}
          sx={{
            padding: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              padding: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            Description
          </Typography>
          <Grid
            container
            sx={{
              padding: {
                xs: 2,
                sm: 3,
              },
            }}
            rowSpacing={2}
            columnSpacing={6}
          >
            {[
              {
                label: "Year",
                value: year,
                icon: `/assets/images/year.svg`,
              },
              {
                label: "Cabins",
                value: cabins,
                icon: `/assets/images/cabin.svg`,
              },
              {
                label: "Beds",
                value: beds,
                icon: `/assets/images/beds.svg`,
              },
              {
                label: "Guests",
                value: guests,
                icon: `/assets/images/beds.svg`,
              },
              {
                label: "Bathrooms",
                value: bathrooms,
                icon: `/assets/images/bathroom.svg`,
              },
              {
                label: "Engine",
                value: engine,
                icon: `/assets/images/engine.svg`,
              },
              {
                label: "Water Tank",
                value: water_capacity,
                icon: `/assets/images/watertank.svg`,
              },
              {
                label: "Sail Type",
                value: sail_type,
                icon: `/assets/images/sail.svg`,
              },
              {
                label: "Fuel Tank",
                value: fuel_capacity,
                icon: `/assets/images/watertank.svg`,
              },
              {
                label: "Length",
                value: length,
                icon: `/assets/images/ruler.svg`,
              },
            ].map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      style={{
                        width: "20px",
                        height: "20px",
                        objectFit: "contain",
                      }}
                    />
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {amenities?.length > 0 && (
          <Grid item xs={12}>
            <Typography
              sx={{
                padding: {
                  xs: 2,
                  sm: 2,
                },
              }}
              variant="h5"
            >
              Amenities
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{
                padding: {
                  xs: 2,
                  sm: 2,
                },
              }}
            >
              {amenities.map((amenity: any, index) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration:
                        amenity.value === "true" ? "none" : "none ",
                      color: amenity.value === "true" ? "inherit" : "",
                      textDecorationThickness:
                        amenity.value === "true" ? "0px" : "2px",
                      textDecorationColor: "gray",
                      textDecorationStyle: "solid",
                    }}
                  >
                    {amenity.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} md={12}>
          <Typography
            variant="h5"
            sx={{
              padding: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            Additional Services
          </Typography>
          <Grid
            item
            xs={12}
            sx={{
              padding: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <Typography variant="body2" sx={{ color: "gray" }}>
              Additional services that will be paid directly at check-in.
            </Typography>
          </Grid>

          {services.map((service: any) => (
            <Grid
              container
              key={service.id}
              spacing={2}
              sx={{
                marginTop: 1,
                paddingLeft: {
                  xs: 2,
                  sm: 2,
                },
              }}
            >
              {/* Name and Description Column */}
              <Grid item xs={8}>
                <Typography variant="body2">{service.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </Grid>

              {/* Payable Status Column */}
              <Grid item xs={2}>
                <Typography
                  variant="body2"
                  sx={{ color: service.payableInBase ? "red" : "" }}
                >
                  {service.payableInBase ? "Required" : "Optional"}
                </Typography>
              </Grid>

              {/* Price Column */}
              <Grid item xs={2}>
                <Typography variant="body2">{service.price}€</Typography>
              </Grid>
            </Grid>
          ))}

          <Typography
            sx={{
              paddingLeft: {
                xs: 2,
                sm: 2,
              },
              color: "#006fff",
              fontWeight: "700",
              marginTop: "25px",
              fontSize: "22px",
              display: "flex",
              alignItems: "center", // Align the text and icon
              cursor: "pointer", // Make the text clickable
            }}
            onClick={() => setIsOpen(!isOpen)} // Toggle the state when clicked
          >
            Show all the additional services
            {/* Conditionally render the chevron icon based on state */}
            {isOpen ? (
              <ExpandLess sx={{ marginLeft: "8px", fontSize: "24px" }} />
            ) : (
              <ExpandMore sx={{ marginLeft: "8px", fontSize: "24px" }} />
            )}
          </Typography>

          {/* <Grid item xs={12} md={4}>
         
            <MapboxMap
              yachtLocations={yachtLocations}
              hoveredLocation={hoveredLocation}
            />
          </Grid> */}

          {isOpen && (
            <>
              {" "}
              {additionalServices?.map((service: any) => (
                <Grid
                  container
                  key={service.id}
                  spacing={2}
                  sx={{
                    marginTop: 1,
                    paddingLeft: {
                      xs: 2,
                      sm: 2,
                    },
                  }}
                >
                  {/* Name and Description Column */}
                  <Grid item xs={8}>
                    <Typography variant="body2">{service.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {service.description}
                    </Typography>
                  </Grid>

                  {/* Payable Status Column */}
                  <Grid item xs={2}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: service.includesDepositWaiver ? "green" : "black",
                      }}
                    >
                      {service.includesDepositWaiver
                        ? "Refundable"
                        : "Optional"}
                    </Typography>
                  </Grid>

                  {/* Price Column */}
                  <Grid item xs={2}>
                    <Typography variant="body2">{service.price}€</Typography>
                  </Grid>
                </Grid>
              ))}
            </>
          )}

          <Typography
            sx={{
              paddingLeft: {
                xs: 2,
                sm: 2,
              },
              color: "#006fff",
              fontWeight: "700",
              marginTop: "25px",
              fontSize: "22px",
              display: "flex",
              alignItems: "center", // Align the text and icon
              cursor: "pointer", // Make the text clickable
            }}
            onClick={() => setShowLocation(!showLocation)} // Toggle the state when clicked
          >
            Boat Location
            {/* Conditionally render the chevron icon based on state */}
            {showLocation ? (
              <ExpandLess sx={{ marginLeft: "8px", fontSize: "24px" }} />
            ) : (
              <ExpandMore sx={{ marginLeft: "8px", fontSize: "24px" }} />
            )}
          </Typography>

          <Grid
            sx={{
              paddingLeft: {
                xs: 2,
                sm: 2,
              },
              marginTop: "25px",
            }}
          >
            {showLocation && (
              <MapBoxComp
                location={locationn}
                // hoveredLocation={hoveredLocation}
              />
            )}
          </Grid>

          <Typography
            sx={{
              paddingLeft: {
                xs: 2,
                sm: 2,
              },
              color: "#006fff",
              fontWeight: "700",
              marginTop: "25px",
              fontSize: "22px",
              display: "flex",
              alignItems: "center", // Align the text and icon
              cursor: "pointer", // Make the text clickable
            }}
            onClick={() => setShowMoreBoats(!showMoreBoats)} // Toggle the state when clicked
          >
            More boats you may like{" "}
            {/* Conditionally render the chevron icon based on state */}
            {showMoreBoats ? (
              <ExpandLess sx={{ marginLeft: "8px", fontSize: "24px" }} />
            ) : (
              <ExpandMore sx={{ marginLeft: "8px", fontSize: "24px" }} />
            )}
          </Typography>
          <Box
      sx={{
        display: "flex", // Flexbox for inline layout
        flexWrap: "wrap", // Wraps to the next row if there are too many cards
        gap: "16px", // Space between cards
      }}
    >
      {similarBoats?.map((boat: any) => (
        <Box
          key={boat.id}
          sx={{
            flex: "1 1 calc(33.33% - 16px)", // Adjusts the width dynamically (3 cards per row)
            maxWidth: "calc(33.33% - 16px)", // Ensures consistent card width
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Image Carousel */}
          <Carousel
            arrows infinite={false} dots={false}
            style={{ borderRadius: "8px", overflow: "hidden" }}
          >
            {boat?.yacht?.images.map((image: any, index: number) => (
              <div key={index}>
                <img
                  src={image?.url}
                  alt={`Boat ${boat.id}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                  onClick={() => handleYachtClick(boat)}
                />
              </div>
            ))}
          </Carousel>
        </Box>
      ))}
    </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          {yachtAvailability && (
            <SliderComponent yachtAvailability={yachtAvailability} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default YachtInfo;
