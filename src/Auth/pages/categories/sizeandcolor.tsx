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

// Define types for the attributes
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
  setAttributes: (attrs: Attributes) => void;
};
const SizeAndColor: React.FC<SizeAndColorProps> = ({ setAttributes }) => {
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
    <Card elevation={0} sx={{ borderRadius: 3, p: 1 }}>
      <Grid container spacing={3}>
        {/* Tabs Navigation */}
        <Grid
          sx={{ pt: "0px !important", pl: "0px !important" }}
          container
          item
          xs={12}
          sm={12}
        >
          <Box
            justifyContent={"space-between"}
            alignItems={"end"}
            width={"100%"}
            display={"flex"}
          >
            <Tabs
              orientation="horizontal"
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                height: "100%",
                borderColor: "divider",
                "& .MuiTab-root": {
                  alignItems: "flex-start",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                  px: 2,
                  display: "flow",
                  justifyContent: "center",
                },
                "& .Mui-selected": {
                  backgroundColor: "#fff",
                  color: "#000 !important",
                },
              }}
            >
              <Tab label="Size" />
              <Tab label="Quantity" />
              <Tab label="Color" />
            </Tabs>
            <Box
              border={"1.5px solid #828BB9"}
              sx={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "5px",
                color: "#828BB9",
              }}
              onClick={tabValue === 0 ? addSize : addColor}
            >
              +
            </Box>
          </Box>
        </Grid>

        {/* Content Display Based on Active Tab */}
        <Grid item xs={12} sm={9}>
          {tabValue === 0 && (
            <>
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
                          padding: "9px 10px",
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
                          padding: "9px 10px",
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
                      sx={{
                        color: "#4F4D55", // text color
                        fontSize: "14px",
                        padding: "9px 10px",
                        ".MuiSelect-select": {
                          padding: "9px 10px",
                        },
                        height: "38px !important",
                      }}
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
            </>
          )}

          {tabValue === 1 && (
            <>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Select
                    fullWidth
                    value={quantityUnit}
                    onChange={(e) => setQuantityUnit(e.target.value)}
                    sx={{
                      color: "#4F4D55", // text color
                      fontSize: "14px",
                      padding: "9px 10px",
                      ".MuiSelect-select": {
                        padding: "9px 10px",
                      },
                      height: "38px !important",
                    }}
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
                        padding: "9px 10px",
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
                          padding: "9px 10px",
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
                          padding: "9px 10px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      border={"1px solid #D0D0D0"}
                      borderRadius={1}
                      p={"4px"}
                    >
                      <Box
                        sx={{
                          width: 90,
                          height: 30,
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
            </>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default SizeAndColor;
