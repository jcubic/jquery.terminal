#include <bits/stdc++.h>
using namespace std;
int merge(int arr[], int low, int mid, int high)
{
    int i = low, j = mid + 1, k = low;
    int b[high];
    int count=0;
    while (i <= mid && j <= high)
    {
        if (arr[i] <= arr[j])
        {
            b[k] = arr[i];
            i++;
            k++;
        }
        else
        {
            b[k] = arr[j];
            j++;
            k++;
            count+=mid+1-i;
        }
    }
    if (i > mid)
    {
        while (j<=high)
        {
            b[k]=arr[j];
            j++;
            k++;
        }
        
    }
    else{
        while (i<=mid)
        {
            b[k]=arr[i];
            i++;
            k++;
        }
        
    }
    for(k=low;k<=high;k++)
    arr[k]=b[k];

    return count;
}
int mergesort(int arr[], int low, int high)
{
    int mid;
    int count = 0;
    if (high > low)
    {
        mid = (high + low) / 2;
        count += mergesort(arr, low, mid);
        count += mergesort(arr, mid + 1, high);
        count += merge(arr, low, mid, high);
    }

    return count;
}
int main()
{

    int n;
    cout << "enter array length=";
    cin >> n;
    int arr[n];
    cout << "\n enter array to be sorted=";
    for (int i = 0; i < n; i++)
    {
        cin >> arr[i];
    }

    cout << mergesort(arr, 0, n);
    cout << endl;
return 0;
}