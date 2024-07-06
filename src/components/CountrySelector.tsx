import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';

interface CountryProps {
  data: Record<string, string[]>;
  handleChange: (value: any) => void;
  schema: any;
}

interface childrenProps {
  country: string;
  continent: string;
  checked: boolean;
}

const classes = {
  container: {
    padding: '1em',
    width: '100%',
    overflow: 'scroll',
    maxHeight: '40%',
    backgroundColor: '#ecf0f1',
    marginTop: '10px',
  },
};

export const CountrySelector: React.FC<CountryProps> = ({
  data,
  handleChange,
  schema,
}) => {
  const [selectedContinents, setSelectedContinents] = useState(data || {});

  useEffect(() => {
    handleChange(selectedContinents);
  }, [selectedContinents, handleChange]);

  const handleContinentChange = (continent: string) => {
    const allCountries = schema.properties[continent].items.enum;
    if (selectedContinents[continent]?.length === allCountries.length) {
      // Deselect all countries in the continent
      setSelectedContinents({
        ...selectedContinents,
        [continent]: [],
      });
    } else {
      // Select all countries in the continent
      setSelectedContinents({
        ...selectedContinents,
        [continent]: allCountries,
      });
    }
  };

  const handleCountryChange = (continent: string, country: string) => {
    const countries = selectedContinents[continent] || [];
    const isSelected = countries.includes(country);
    const updatedCountries = isSelected
      ? countries.filter(c => c !== country)
      : [...countries, country];

    setSelectedContinents({
      ...selectedContinents,
      [continent]: updatedCountries,
    });
  };

  return (
    <div>
      <label>Pays Visités</label>
      <Grid
        container
        justifyContent={'center'}
        spacing={1}
        style={classes.container}>
        {Object.keys(schema.properties).map(continent => (
          <Grid item sm={4} key={continent}>
            <FormControlLabel
              label={continent}
              control={
                <Checkbox
                  size="small"
                  checked={
                    selectedContinents[continent]?.length ===
                    schema.properties[continent].items.enum.length
                  }
                  indeterminate={
                    schema.properties[continent][0] !=
                    schema.properties[continent][1]
                  }
                  onChange={() => handleContinentChange(continent)}
                />
              }
            />
            {schema.properties[continent].items.enum.map((country: string) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  ml: 3,
                  p: 0,
                }}
                key={country}>
                <FormControlLabel
                  label={country}
                  control={
                    <Checkbox
                      size="small"
                      checked={selectedContinents[continent]?.includes(country)}
                      onChange={() => handleCountryChange(continent, country)}
                    />
                  }
                />
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
