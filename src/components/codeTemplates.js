// codeTemplates.js

const DEFAULT_TEMPLATES = {
  javascript: `function solve(input) {
    // Your solution here
    
    return result;
}

// Example usage:
// console.log(solve("your input"));`,
  
  python: `def solve(input):
    """
    Your solution here
    """
    
    return result

# Example usage:
# print(solve("your input"))`,
  
  cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

string solve(string input) {
    // Your solution here
    
    return result;
}

int main() {
    // Example usage:
    // cout << solve("your input") << endl;
    return 0;
}`,
  
  java: `import java.util.*;

public class Solution {
    public static String solve(String input) {
        // Your solution here
        
        return result;
    }
    
    public static void main(String[] args) {
        // Example usage:
        // System.out.println(solve("your input"));
    }
}`
};

export default DEFAULT_TEMPLATES;
