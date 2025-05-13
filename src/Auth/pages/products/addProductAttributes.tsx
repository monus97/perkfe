import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";

const unitOptions = ["CM", "INCH"];
const quantityUnits = ["Box", "Piece", "Pack"];
type SizeAttribute = {
  size: string;
  value: string;
  unit: string;
};
type QuantityAttribute = {
  unit: string;
  value: string;
};
type ColorAttribute = {
  name: string;
  hex: string;
};

type Attributes = {
  size: SizeAttribute[];
  quantity: QuantityAttribute;
  color: ColorAttribute[]; // Consider renaming to include `hex` if needed
};
type SizeAndColorProps = {
  setAttributes: React.Dispatch<React.SetStateAction<Attributes>>;
};
const SizeSelectorCard: React.FC<SizeAndColorProps> = ({ setAttributes }) => {
  const [tabValue, setTabValue] = useState(0);

  // Size Tab State
  const [sizes, setSizes] = useState([
    { size: "XL", value: "44", unit: "CM" },
    { size: "L", value: "", unit: "" },
    { size: "M", value: "", unit: "" },
    { size: "S", value: "", unit: "" },
    { size: "XS", value: "", unit: "" },
  ]);
  const [colorList, setColorList] = useState([
    { name: "Black", hex: "#000000" },
    { name: "Red", hex: "#F80A0A" },
    { name: "Violate", hex: "#8A2BE2" },
    { name: "Purple", hex: "#800080" },
  ]);
  // Quantity Tab State
  const [quantityUnit, setQuantityUnit] = useState("Box");
  const [quantityValue, setQuantityValue] = useState("1");

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  type SizeField = "size" | "value" | "unit";
  const handleSizeChange = (index: number, field: SizeField, value: any) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  const addSize = () => setSizes([...sizes, { size: "", value: "", unit: "" }]);

  const removeSize = (index: number) => {
    const updated = sizes.filter((_, i) => i !== index);
    setSizes(updated);
  };

  const handleColorChange = (
    index: number,
    field: "name" | "hex",
    value: string
  ) => {
    const updated = [...colorList];
    updated[index][field] = value;
    setColorList(updated);
  };

  const addColor = () => {
    setColorList([...colorList, { name: "", hex: "" }]);
  };

  const removeColor = (index: number) => {
    const updated = colorList.filter((_, i) => i !== index);
    setColorList(updated);
  };
    const buildAttributes = useCallback(() => {
      return {
        size: sizes,
        color: colorList,
        quantity: {
          unit: quantityUnit,
          value: quantityValue,
        },
      };
    }, [sizes, colorList, quantityUnit, quantityValue]);
    useEffect(() => {
      setAttributes(buildAttributes());
    }, [buildAttributes]);

  return (
    <Card elevation={0} sx={{ borderRadius: 3, p: 3 }}>
      <Grid container spacing={3}>
        {/* Tabs Navigation */}
        <Grid item xs={12} sm={3}>
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              height: "100%",
              borderRight: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                alignItems: "flex-start",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                px: 2,
                mb: 1,
              },
              "& .Mui-selected": {
                backgroundColor: "#8F9CDA",
                color: "#fff !important",
              },
            }}
          >
            <Tab label="Size" />
            <Tab label="Quantity" />
            <Tab label="Color" />
          </Tabs>
        </Grid>

        {/* Content Display Based on Active Tab */}
        <Grid item xs={12} sm={9}>
          {tabValue === 0 && (
            <>
              <Typography fontSize={18} color="#0A090B" fontWeight={600}>
                Select Size
              </Typography>
              <Typography fontSize={"14px"} color="#A3A2A6" mb={2}>
                Add all available sizes of your product
              </Typography>

              {sizes.map((item, index) => (
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  key={index}
                  mb={1}
                >
                  <Grid item xs={12} sm={3}>
                    <TextField
                      placeholder="Size"
                      value={item.size}
                      onChange={(e) =>
                        handleSizeChange(index, "size", e.target.value)
                      }
                      fullWidth
                      sx={{
                        "& input": {
                          color: "#4F4D55", // Replace with your desired color
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      placeholder="Enter"
                      value={item.value}
                      onChange={(e) =>
                        handleSizeChange(index, "value", e.target.value)
                      }
                      fullWidth
                      sx={{
                        "& input": {
                          color: "#4F4D55", // Replace with your desired color
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Select
                      displayEmpty
                      value={item.unit}
                      onChange={(e) =>
                        handleSizeChange(index, "unit", e.target.value)
                      }
                      fullWidth
                      renderValue={(selected) => selected || "Select Unit"}
                    >
                      {unitOptions.map((unit) => (
                        <MenuItem key={unit} value={unit}>
                          {unit}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <IconButton onClick={() => removeSize(index)} color="error">
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Button
                variant="outlined"
                onClick={addSize}
                sx={{
                  mt: 2,
                  color: "#3f51b5",
                  fontSize: "14px",
                  fontWeight: "400",
                  background: "#F4F4F5",
                  border: "none",
                }}
              >
                + Size
              </Button>
            </>
          )}

          {tabValue === 1 && (
            <>
              <Typography fontSize={18} color="#0A090B" fontWeight={600}>
                Select Quantity
              </Typography>
              <Typography fontSize={"14px"} color="#A3A2A6" mb={2}>
                Add available quantity
              </Typography>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Select
                    fullWidth
                    value={quantityUnit}
                    onChange={(e) => setQuantityUnit(e.target.value)}
                  >
                    {quantityUnits.map((unit) => (
                      <MenuItem key={unit} value={unit}>
                        {unit}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="number"
                    value={quantityValue}
                    sx={{
                      "& input": {
                        color: "#4F4D55", // Replace with your desired color
                        fontSize: "14px",
                      },
                    }}
                    onChange={(e) => setQuantityValue(e.target.value)}
                  />
                </Grid>
              </Grid>
            </>
          )}

          {tabValue === 2 && (
            <>
              <Typography fontSize={18} color="#0A090B" fontWeight={600}>
                Select Color
              </Typography>
              <Typography fontSize={"14px"} color="#A3A2A6" mb={2}>
                Add all available color of your product
              </Typography>

              {colorList.map((item, index) => (
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  key={index}
                  mb={1}
                >
                  <Grid item xs={12} sm={3}>
                    <TextField
                      placeholder="Color Name"
                      value={item.name}
                      onChange={(e) =>
                        handleColorChange(index, "name", e.target.value)
                      }
                      fullWidth
                      sx={{
                        "& input": {
                          color: "#4F4D55", // Replace with your desired color
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      placeholder="#000000"
                      value={item.hex}
                      onChange={(e) =>
                        handleColorChange(index, "hex", e.target.value)
                      }
                      fullWidth
                      sx={{
                        "& input": {
                          color: "#4F4D55", // Replace with your desired color
                          fontSize: "14px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      p={1}
                      border={"1px solid #D0D0D0"}
                      borderRadius={1}
                    >
                      <Box
                        sx={{
                          width: 90,
                          height: 40,
                          borderRadius: 1,
                          backgroundColor: item.hex || "#fff",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <IconButton
                      onClick={() => removeColor(index)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Button
                variant="outlined"
                onClick={addColor}
                sx={{
                  mt: 2,
                  color: "#3f51b5",
                  fontSize: "14px",
                  fontWeight: "400",
                  background: "#F4F4F5",
                  border: "none",
                }}
              >
                + Color
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default SizeSelectorCard;
