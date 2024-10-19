// import { User } from "../common";

import { TrackReturnProps } from "../Interface";

export const getItem = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export const formatDuration = (ms: number): string => {
    // Convert milliseconds to seconds
    let totalSeconds = Math.floor(ms / 1000);
    
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    // Format the result based on the duration
    if (hours > 0) {
      return `${hours}:${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }
   
export const setItem = (key: string, value: any) => {
    const data: string = JSON.stringify(value);
    localStorage.setItem(key, data);
}

// export const getFullName = (user: User | undefined ): string => {
//     return user ? `${user?.firstName} ${user?.lastName}` : '' ;
// }

export const sortArray = (unsortedArray: any[], field: string): Array<any> => {
    const items = [...unsortedArray];
    let sortedArray: Array<any> = [];
    if(field === 'createdAt'){
        sortedArray = items.sort((a, b) => {
            const d1: any = new Date(a[field]);
            const d2: any = new Date(b[field]);
            return d1 - d2;
        });   
    }else {
        sortedArray = items.sort((a, b) => {
            return a[field] < b[field] ? -1 : 1;
        });
    }
    return sortedArray;
}

export const formatCurrency = (amount: number | undefined, currency: string | undefined, locale: string = 'en-US'): string => {
    if(amount && currency){
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
          }).format(amount);
    }
    return '';
};

export const TrackDecider = (currentTrackId: string = '', tracks: string[]): TrackReturnProps => {
    let trackId: string = (currentTrackId && tracks.length > 0) ? currentTrackId : tracks[0];

    let returnProps: TrackReturnProps = {
        currentTrackId: '',
        nextTrackId: '',
        prevTrackId: ''
    };

    if(tracks.length > 0){
        let trackIndex: number = tracks.findIndex(track => track === trackId);
        let prevIndex: number = 0;
        let nextIndex: number = 0;
        if(trackIndex < 0){
            trackIndex = 0;
            nextIndex = trackIndex + 1;
            prevIndex = tracks.length - 1;
        }
        if(trackIndex === 0){
            nextIndex = trackIndex + 1;
            prevIndex = tracks.length - 1;
        }
        if(trackIndex > 0 && trackIndex < (tracks.length - 1)){
            nextIndex = trackIndex + 1;
            prevIndex = trackIndex - 1;
        }
        if(trackIndex === (tracks.length - 1)){
            nextIndex = 0;
            prevIndex = trackIndex - 1;
        }

        returnProps.currentTrackId = tracks[trackIndex];
        returnProps.nextTrackId = tracks[nextIndex];
        returnProps.prevTrackId = tracks[prevIndex];
    }

    return returnProps;
}

export const encodeArrayToBase64 = (arr: string[]): string => {
    const jsonString = JSON.stringify(arr);  // Convert array to JSON string
    return btoa(jsonString);                 // Encode JSON string to Base64
}

export const decodeBase64ToArray = (base64String: string): string[] => {
    const jsonString = atob(base64String);  // Decode Base64 to JSON string
    return JSON.parse(jsonString);          // Parse JSON string back to array
}

