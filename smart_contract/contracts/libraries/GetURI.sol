// SPDX-License-Identifier: MIT

import "base64-sol/base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity ^0.8.6;

library GetURI {
    function getURI(uint256[] memory randomNumbers)
        public
        pure
        returns (string memory svg)
    {
        string[20] memory colors = [
            "#E7EBDA",
            "#FFA420",
            "#18171C",
            "#587246",
            "#26252D",
            "#403A3A",
            "#CDA434",
            "#ED760E",
            "#3B3C36",
            "#C7B446",
            "#5E2129",
            "#35682D",
            "#3E5F8A",
            "#EDFF21",
            "#7FB5B5",
            "#D36E70",
            "#7E7B52",
            "#6A5F31",
            "#D36E70",
            "#47402E"
        ];
        string memory linesPath = string(
            abi.encodePacked(
                "<line stroke='",
                colors[randomNumbers[1] % colors.length],
                " ' stroke-width='",
                Strings.toString(randomNumbers[1] % 100),
                "' opacity='0.",
                Strings.toString((randomNumbers[1] % 98)),
                "' x1='",
                Strings.toString((randomNumbers[1] % 97)),
                "' y1='",
                Strings.toString((randomNumbers[1] % 95)),
                "' x2='",
                Strings.toString((randomNumbers[1] % 92)),
                "' y2='",
                Strings.toString((randomNumbers[1] % 87)),
                "' />"
            )
        );
        string memory circlesPath = string(
            abi.encodePacked(
                "<circle cx='",
                Strings.toString((randomNumbers[2] % 98)),
                "' cy='",
                Strings.toString((randomNumbers[2] % 97)),
                "' r='",
                Strings.toString((randomNumbers[2] % 95) / 2),
                "' opacity='0.",
                Strings.toString((randomNumbers[2] % 92) % 10),
                "' fill='",
                colors[randomNumbers[2] % colors.length],
                "'/>"
            )
        );
        string memory trianglesPath1 = string(
            abi.encodePacked(
                "<polygon fill='",
                colors[randomNumbers[3] % colors.length],
                "' opacity='0.",
                Strings.toString((randomNumbers[3] % 100)),
                "' points='",
                Strings.toString((randomNumbers[3] % 98)),
                ",",
                Strings.toString((randomNumbers[3] % 97)),
                " ",
                Strings.toString((randomNumbers[3] % 95)),
                ","
            )
        );
        string memory trianglesPath2 = string(
            abi.encodePacked(
                Strings.toString((randomNumbers[3] % 92)),
                " ",
                Strings.toString((randomNumbers[3] % 87)),
                ",",
                Strings.toString((randomNumbers[3] % 66)),
                " ",
                Strings.toString((randomNumbers[3] % 45)),
                ",",
                Strings.toString((randomNumbers[3] % 11)),
                "' />"
            )
        );
        string memory imageString = string(
            abi.encodePacked(
                "<svg version='1.1' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' style='background-color: ",
                colors[randomNumbers[0] % colors.length],
                " '>",
                linesPath,
                circlesPath,
                trianglesPath1,
                trianglesPath2,
                "</svg>"
            )
        );
        return
            string(
                abi.encodePacked(
                    " data:image/svg+xml;base64,",
                    Base64.encode(bytes(imageString))
                )
            );
    }
}
