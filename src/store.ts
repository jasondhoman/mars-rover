import { reactive } from 'vue';

interface Store {
  selected_rover: string;
}

export interface Manifest {
  name: string;
  landing_date: Date;
  launch_date: Date;
  status: string;
  max_sol: number;
  max_date: Date;
  total_photos: number;
  photos: Array<ManifestPhotos>;
}

interface ManifestPhotos {
  sol: number;
  earth_date: string;
  total_photos: number;
  cameras: Array<string>;
}

interface RoverSelect {
  id: number;
  name: string;
}

interface Camera {
  id: number;
  name: string;
  rover_id: string;
  full_name: string;
}

interface Rover {
  id: number;
  name: string;
  landing_date: Date;
  launch_date: Date;
  status: string;
}

interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: Date;
  rover: Rover;
}

export const getPhotos = async (
  selected_rover: string,
  selected_camera: string,
  date_selected: string
): Promise<Array<Photo> | undefined> => {
  let uri = `${
    import.meta.env.VITE_BASE_URI
  }/rovers/${selected_rover}/photos?api_key=${
    import.meta.env.VITE_API_KEY
  }&page=1&camera=${selected_camera.toLowerCase()}&earth_date=${date_selected}`;

  const res = await fetch(uri);
  if (res.status == 200) {
    let data = await res.json();
    let photos: Array<Photo> = data['photos'];
    return photos;
  }
  return;
};

export const getManifest = async (
  selected_rover: string
): Promise<Manifest | undefined> => {
  let uri = `${
    import.meta.env.VITE_BASE_URI
  }manifests/${selected_rover}?api_key=${import.meta.env.VITE_API_KEY}`;

  const res = await fetch(uri);
  if (res.status == 200) {
    let data = await res.json();
    let manifests: Manifest = data['photo_manifest'];
    return manifests;
  }
  return;
};

export const store = reactive<Store>({
  selected_rover: '',
});
