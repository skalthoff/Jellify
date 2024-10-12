import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "../../../enums/mutation-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";

import * as Keychain from "react-native-keychain"
import { useServerUrl } from "../../queries/storage";
import { Jellyfin } from "@jellyfin/sdk";
import { client } from "../../queries";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api"
import { JellyfinCredentials } from "../../types/jellyfin-credentials";