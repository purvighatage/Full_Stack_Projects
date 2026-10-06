import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  alpha
} from '@mui/material';
import {
  Book,
  Search,
  AccountCircle,
  MenuBook,
  Star,
  ListAlt
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';

// Color constants to match homepage
const primaryColor = '#0d47a1';
const secondaryColor = '#ff9800';
const accentColor = '#ffc107';

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #0d47a1 80%, #1565c0 100%)',
  boxShadow: '0 8px 32px 0 rgba(13, 71, 161, 0.18)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderBottomLeftRadius: theme.shape.borderRadius * 2,
  borderBottomRightRadius: theme.shape.borderRadius * 2,
  position: 'sticky',
  top: 0,
  zIndex: 1100,
}));

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha('#ffffff', 0.18),
  boxShadow: '0 2px 8px 0 rgba(13, 71, 161, 0.08)',
  marginRight: theme.spacing(4),
  width: '100%',
  maxWidth: 400,
  transition: 'background 0.2s',
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.28),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#fff',
  width: '100%',
  fontWeight: 500,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    borderRadius: theme.shape.borderRadius * 2,
    [theme.breakpoints.up('sm')]: {
      width: '28ch',
      '&:focus': {
        width: '34ch',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '36ch',
      '&:focus': {
        width: '44ch',
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  color: '#fff',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 2.5),
  transition: 'background 0.2s, transform 0.2s',
  '&:hover': {
    background: alpha(accentColor, 0.16),
    color: accentColor,
    transform: 'translateY(-2px) scale(1.06)',
  },
}));

const OutlinedNavButton = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.shape.borderRadius * 2,
  borderWidth: '2px',
  color: accentColor,
  borderColor: accentColor,
  padding: theme.spacing(1, 3),
  background: alpha('#fff', 0.12),
  transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.2s',
  '&:hover': {
    background: alpha(accentColor, 0.12),
    color: '#fff',
    borderColor: accentColor,
    transform: 'scale(1.07)',
  },
}));

const Navbar = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Avatar logic
  const profileAvatar = user?.avatarUrl || ""; // Use your avatar field or leave blank for initial
  const profileName = user?.name || "U";

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <GlassAppBar elevation={0}>
      <Toolbar sx={{ minHeight: '70px', px: { xs: 1, md: 2 } }}>
        {/* Left: Logo and Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Book sx={{ mr: 1, fontSize: '2.2rem', color: accentColor }} />
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: '#fff',
                fontWeight: 'bold',
                letterSpacing: '1px',
                fontFamily: 'Montserrat, sans-serif',
                transition: 'color 0.2s',
                '&:hover': { color: accentColor }
              }}
            >
              BookRev
            </Typography>
          </Box>
          <SearchBar>
            <SearchIconWrapper>
              <Search fontSize="medium" sx={{ color: accentColor }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search books, authors, or categories…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBar>
        </Box>

        {/* Right: Navigation and User */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NavButton
            component={Link}
            to="/books"
            startIcon={<MenuBook sx={{ color: accentColor }} />}
          >
            Browse Books
          </NavButton>
          {isAuthenticated && (
            <>
              <NavButton
                component={Link}
                to="/favorites"
                startIcon={<Star sx={{ color: accentColor }} />}
              >
                Favorites
              </NavButton>
              <NavButton
                component={Link}
                to="/reading-list"
                startIcon={<ListAlt sx={{ color: accentColor }} />}
              >
                My List
              </NavButton>
            </>
          )}
          <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Profile Avatar always visible */}
            <IconButton
              component={Link}
              to="/profile"
              sx={{
                p: 0,
                ml: 1,
                border: `2px solid ${accentColor}`,
                background: alpha(accentColor, 0.08),
                transition: 'background 0.2s, transform 0.2s, border 0.2s',
                '&:hover': {
                  background: alpha(accentColor, 0.18),
                  border: `2.5px solid ${secondaryColor}`,
                  transform: 'scale(1.08)'
                }
              }}
              aria-label="Profile"
            >
              <Avatar
                src={isAuthenticated ? profileAvatar : ""}
                alt={profileName}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: accentColor,
                  color: primaryColor,
                  fontWeight: 700,
                  fontSize: '1.2rem'
                }}
              >
                {profileName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            {/* Optionally keep AccountCircle dropdown menu for authenticated users */}
            {isAuthenticated && (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  onClick={handleMenu}
                  sx={{
                    p: 1.5,
                    background: alpha(accentColor, 0.08),
                    borderRadius: '50%',
                    transition: 'background 0.2s, transform 0.2s',
                    '&:hover': {
                      background: alpha(accentColor, 0.18),
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <AccountCircle sx={{ fontSize: '2.1rem', color: accentColor }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>My Profile</MenuItem>
                  <MenuItem component={Link} to="/settings" onClick={handleClose}>Settings</MenuItem>
                  <MenuItem component={Link} to="/logout" onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </GlassAppBar>
  );
};

export default Navbar;
