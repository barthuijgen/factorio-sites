import phin from "phin";
import * as OpenID from "openid";

/*
 * Reference material
 * https://github.com/LeeviHalme/node-steam-openid/blob/master/index.js
 */

export const getSteamRedirectUrl = async (realm_url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const RETURN_URL = `${realm_url}/api/openid/return`;
    const rp = new OpenID.RelyingParty(RETURN_URL, realm_url, true, true, []);

    rp.authenticate("https://steamcommunity.com/openid", false, (error, authUrl) => {
      if (error) return reject("Authentication failed: " + error);
      if (!authUrl) return reject("Authentication failed.");
      resolve(authUrl);
    });
  });

export const fetchSteamProfile = async (steam_id: string, api_key: string) => {
  try {
    const response = await phin<{ response: { players?: Record<string, string>[] } }>({
      url: `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${api_key}&steamids=${steam_id}`,
      parse: "json",
    });

    const players = response?.body?.response?.players;

    if (players && players.length > 0) {
      // Get the player
      const player = players[0];

      // Return user data
      return {
        _json: player,
        steam_id: steam_id,
        username: player.personaname,
        name: player.realname,
        profile: player.profileurl,
        avatar: {
          small: player.avatar,
          medium: player.avatarmedium,
          large: player.avatarfull,
        },
      };
    } else {
      throw Error("No players found for the given SteamID.");
    }
  } catch (error: unknown) {
    throw Error("Steam server error: " + (error as Error).message);
  }
};

export const steamAuthenticate = async (return_url: string, realm_url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const RETURN_URL = `${realm_url}/api/openid/return`;
    const rp = new OpenID.RelyingParty(RETURN_URL, realm_url, true, true, []);

    rp.verifyAssertion(return_url, async (error, result) => {
      if (error) {
        return reject(error.message);
      }
      if (!result || !result.authenticated || !result.claimedIdentifier) {
        return reject("Failed to authenticate user.");
      }
      if (!/^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/.test(result.claimedIdentifier)) {
        return reject("Claimed identity is not valid.");
      }

      resolve(result.claimedIdentifier.replace("https://steamcommunity.com/openid/id/", ""));
    });
  });
