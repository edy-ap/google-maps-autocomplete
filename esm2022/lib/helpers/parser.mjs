export function parseGermanAddress(placeResult) {
    const germanAddress = {
        gmID: placeResult.id,
        icon: placeResult.icon,
        url: placeResult.url,
        placeID: placeResult.place_id,
        displayAddress: placeResult.formatted_address,
        name: placeResult.name,
        vicinity: placeResult.vicinity,
        locality: {},
        state: {},
        country: {},
        geoLocation: { latitude: -1, longitude: -1 },
    };
    if (placeResult.geometry && placeResult.geometry.location) {
        germanAddress.geoLocation.latitude = placeResult.geometry.location.lat();
        germanAddress.geoLocation.longitude = placeResult.geometry.location.lng();
    }
    if (placeResult.address_components && placeResult.address_components.length > 0) {
        placeResult.address_components.forEach(value => {
            if (value.types.indexOf('street_number') > -1) {
                germanAddress.streetNumber = value.short_name;
            }
            if (value.types.indexOf('route') > -1) {
                germanAddress.streetName = value.long_name;
            }
            if (value.types.indexOf('postal_code') > -1) {
                germanAddress.postalCode = value.short_name;
            }
            if (value.types.indexOf('sublocality') > -1) {
                germanAddress.sublocality = value.long_name;
            }
            if (value.types.indexOf('locality') > -1) {
                germanAddress.locality.long = value.long_name;
                germanAddress.locality.short = value.short_name;
            }
            if (value.types.indexOf('administrative_area_level_1') > -1) {
                germanAddress.state.long = value.long_name;
                germanAddress.state.short = value.short_name;
            }
            if (value.types.indexOf('country') > -1) {
                germanAddress.country.long = value.long_name;
                germanAddress.country.short = value.short_name;
            }
            if (value.types.indexOf('administrative_area_level_3') > -1) {
                germanAddress.locality.short = value.short_name;
            }
        });
    }
    return germanAddress;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1tYXRlcmlhbC1leHRlbnNpb25zL2dvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS9zcmMvbGliL2hlbHBlcnMvcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxXQUF3QjtJQUN6RCxNQUFNLGFBQWEsR0FBa0I7UUFDbkMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxFQUFFO1FBQ3BCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtRQUN0QixHQUFHLEVBQUUsV0FBVyxDQUFDLEdBQUc7UUFDcEIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxRQUFRO1FBQzdCLGNBQWMsRUFBRSxXQUFXLENBQUMsaUJBQWlCO1FBQzdDLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSTtRQUN0QixRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVE7UUFDOUIsUUFBUSxFQUFFLEVBQUU7UUFDWixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsV0FBVyxFQUFFLEVBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztLQUMzQyxDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ3pELGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pFLGFBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQzNFO0lBRUQsSUFBSSxXQUFXLENBQUMsa0JBQWtCLElBQUksV0FBVyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDL0UsV0FBVyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUM3QyxhQUFhLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7YUFDL0M7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNyQyxhQUFhLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDNUM7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUMzQyxhQUFhLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7YUFDN0M7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUMzQyxhQUFhLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDN0M7WUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUN4QyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUM5QyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQ2pEO1lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUMzRCxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUMzQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO2FBQzlDO1lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDdkMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztnQkFDN0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQzthQUNoRDtZQUNELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDM0QsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQzthQUNqRDtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBsYWNlUmVzdWx0ID0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlUmVzdWx0O1xuaW1wb3J0IHtHZXJtYW5BZGRyZXNzfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR2VybWFuQWRkcmVzcyhwbGFjZVJlc3VsdDogUGxhY2VSZXN1bHQpOiBHZXJtYW5BZGRyZXNzIHtcbiAgY29uc3QgZ2VybWFuQWRkcmVzczogR2VybWFuQWRkcmVzcyA9IHtcbiAgICBnbUlEOiBwbGFjZVJlc3VsdC5pZCxcbiAgICBpY29uOiBwbGFjZVJlc3VsdC5pY29uLFxuICAgIHVybDogcGxhY2VSZXN1bHQudXJsLFxuICAgIHBsYWNlSUQ6IHBsYWNlUmVzdWx0LnBsYWNlX2lkLFxuICAgIGRpc3BsYXlBZGRyZXNzOiBwbGFjZVJlc3VsdC5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICBuYW1lOiBwbGFjZVJlc3VsdC5uYW1lLFxuICAgIHZpY2luaXR5OiBwbGFjZVJlc3VsdC52aWNpbml0eSxcbiAgICBsb2NhbGl0eToge30sXG4gICAgc3RhdGU6IHt9LFxuICAgIGNvdW50cnk6IHt9LFxuICAgIGdlb0xvY2F0aW9uOiB7bGF0aXR1ZGU6IC0xLCBsb25naXR1ZGU6IC0xfSxcbiAgfTtcblxuICBpZiAocGxhY2VSZXN1bHQuZ2VvbWV0cnkgJiYgcGxhY2VSZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24pIHtcbiAgICBnZXJtYW5BZGRyZXNzLmdlb0xvY2F0aW9uLmxhdGl0dWRlID0gcGxhY2VSZXN1bHQuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCk7XG4gICAgZ2VybWFuQWRkcmVzcy5nZW9Mb2NhdGlvbi5sb25naXR1ZGUgPSBwbGFjZVJlc3VsdC5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKTtcbiAgfVxuXG4gIGlmIChwbGFjZVJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudHMgJiYgcGxhY2VSZXN1bHQuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aCA+IDApIHtcbiAgICBwbGFjZVJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudHMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignc3RyZWV0X251bWJlcicpID4gLTEpIHtcbiAgICAgICAgZ2VybWFuQWRkcmVzcy5zdHJlZXROdW1iZXIgPSB2YWx1ZS5zaG9ydF9uYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3JvdXRlJykgPiAtMSkge1xuICAgICAgICBnZXJtYW5BZGRyZXNzLnN0cmVldE5hbWUgPSB2YWx1ZS5sb25nX25hbWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZigncG9zdGFsX2NvZGUnKSA+IC0xKSB7XG4gICAgICAgIGdlcm1hbkFkZHJlc3MucG9zdGFsQ29kZSA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignc3VibG9jYWxpdHknKSA+IC0xKSB7XG4gICAgICAgIGdlcm1hbkFkZHJlc3Muc3VibG9jYWxpdHkgPSB2YWx1ZS5sb25nX25hbWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignbG9jYWxpdHknKSA+IC0xKSB7XG4gICAgICAgIGdlcm1hbkFkZHJlc3MubG9jYWxpdHkubG9uZyA9IHZhbHVlLmxvbmdfbmFtZTtcbiAgICAgICAgZ2VybWFuQWRkcmVzcy5sb2NhbGl0eS5zaG9ydCA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xJykgPiAtMSkge1xuICAgICAgICBnZXJtYW5BZGRyZXNzLnN0YXRlLmxvbmcgPSB2YWx1ZS5sb25nX25hbWU7XG4gICAgICAgIGdlcm1hbkFkZHJlc3Muc3RhdGUuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2NvdW50cnknKSA+IC0xKSB7XG4gICAgICAgIGdlcm1hbkFkZHJlc3MuY291bnRyeS5sb25nID0gdmFsdWUubG9uZ19uYW1lO1xuICAgICAgICBnZXJtYW5BZGRyZXNzLmNvdW50cnkuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMycpID4gLTEpIHtcbiAgICAgICAgZ2VybWFuQWRkcmVzcy5sb2NhbGl0eS5zaG9ydCA9IHZhbHVlLnNob3J0X25hbWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGdlcm1hbkFkZHJlc3M7XG59XG4iXX0=