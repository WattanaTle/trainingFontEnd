export namespace Utils {

  export function toQueryString(query: any): string {
    var parts = [];
    for (let property in query) {
      let value = query[property];
      // if (value != null && value != undefined)
         parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value))
    }

    return parts.join('&');
  }

  export function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
  }

}
