// import { User } from "../common";

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
